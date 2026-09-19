/**
 * Serializes the Studio's navigation the way the browser does, and fails on
 * any error the Studio would show instead of the interface.
 *
 * Why this exists: `next build`, `tsc` and ESLint all passed on a structure
 * that rendered "Encountered an error while reading structure" and nothing
 * else. The site owner hit it on her first login. The build cannot catch it
 * because a structure is only serialized when a pane opens, in the browser.
 *
 * The specific trap, and the reason a Hebrew Studio needs this check more than
 * an English one: Sanity derives a node's id from its title when none is
 * given, via camelCase(speakingurl(title)). `speakingurl` has no Hebrew
 * table, so every Hebrew title derives the id "" — and an empty id is fatal.
 * In an English Studio the same code is harmless, which is exactly why the
 * mistake is easy to make and impossible to see in review.
 *
 * This imports the real resolver from sanity/structure.ts. Testing a copy
 * would prove nothing about what ships.
 *
 *   node scripts/check-studio-structure.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { createSchema } from "sanity";
import { createStructureBuilder, SerializeError } from "sanity/structure";

const ROOT = resolve(import.meta.dirname, "..");

/** Compile the TypeScript sources with the project's own tsc and import them. */
function compile() {
  const out = mkdtempSync(join(tmpdir(), "studio-structure-"));
  try {
    execFileSync(
      "npx",
      [
        "tsc", "sanity/index.ts", "sanity/structure.ts",
        "--outDir", out,
        // Matches the project's own tsconfig. "bundler" resolution is what
        // lets the type-only import of "sanity/structure" find its exports
        // map; "node" resolution cannot see it.
        "--module", "esnext",
        "--moduleResolution", "bundler",
        "--target", "es2022",
        "--skipLibCheck",
        "--esModuleInterop",
      ],
      { cwd: ROOT, stdio: "pipe" },
    );
  } catch (err) {
    const detail = [err.stdout, err.stderr].filter(Boolean).join("\n").trim();
    rmSync(out, { recursive: true, force: true });
    throw new Error(`the Studio sources did not compile:\n${detail || err.message}`);
  }
  // A bundler adds the extension that tsc leaves off; Node does not, so the
  // emitted `from "./studio-policy"` has to become `from "./studio-policy.js"`.
  // Safe as a regex because the input is compiler output, not hand-written.
  addExtensions(out);
  return out;
}

/** Recursive: the schemas live in a subdirectory, and they import each other. */
function addExtensions(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      addExtensions(file);
    } else if (entry.name.endsWith(".js")) {
      writeFileSync(
        file,
        readFileSync(file, "utf8").replace(
          /(\bfrom\s+")(\.\.?\/[^"]*?)(")/g,
          (m, a, spec, b) => (spec.endsWith(".js") ? m : `${a}${spec}.js${b}`),
        ),
      );
    }
  }
}

/**
 * The structure builder needs a Source. Resolving a real one means a network
 * round trip and an authenticated project; everything the builder touches
 * while serializing is the schema, so this supplies that and stubs the rest.
 * If a future structure reaches for more, this throws a plain TypeError naming
 * the missing piece rather than passing silently.
 */
function makeBuilder(schemas) {
  const schema = createSchema({ name: "check", types: schemas });

  const errors = schema._validation?.flatMap((group) =>
    (group.problems ?? []).filter((p) => p.severity === "error")
      .map((p) => `${group.path?.map((s) => s.name ?? s).join(".") || "?"}: ${p.message}`),
  ) ?? [];
  if (errors.length) {
    console.error("\nThe schema itself does not compile in the Studio:\n");
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  const source = {
    name: "default",
    title: "check",
    projectId: "check",
    dataset: "check",
    schema,
    currentUser: null,
    getClient: () => ({}),
    templates: [],
    initialValueTemplates: [],
    document: {},
    i18n: { t: (key) => key },
  };

  return createStructureBuilder({ source, perspectiveStack: [] });
}

/** Walks the serialized tree so child lists are checked too, not just the root. */
function walk(node, path, seen, report) {
  if (!node || typeof node !== "object") return;

  if (node.type === "list" || node.type === "documentList") {
    if (typeof node.id !== "string" || !node.id) {
      report.push(`${path || "root"}: list has no id`);
    }
    const ids = new Set();
    for (const item of node.items ?? []) {
      if (item?.type === "divider") continue;
      if (item?.id && ids.has(item.id)) {
        report.push(`${path}/${item.id}: two items share this id`);
      }
      if (item?.id) ids.add(item.id);
      walk(item, `${path}/${item?.id ?? "?"}`, seen, report);
    }
  }

  // A child given as a builder or a plain node is serialized on navigation;
  // serialize it now so a broken second pane fails here and not in her browser.
  const child = node.child;
  if (child && typeof child === "object") {
    const serialized = typeof child.serialize === "function"
      ? child.serialize({ path: [node.id ?? ""] })
      : child;
    walk(serialized, `${path}/child`, seen, report);
  }
}

const out = compile();
let structure, schemas;
try {
  ({ structure } = await import(pathToFileURL(join(out, "structure.js")).href));
  ({ schemas } = await import(pathToFileURL(join(out, "index.js")).href));
} finally {
  rmSync(out, { recursive: true, force: true });
}

const S = makeBuilder(schemas);

let serialized;
try {
  serialized = structure(S, {}).serialize({ path: [] });
} catch (err) {
  if (err instanceof SerializeError) {
    console.error(`\nThe Studio would refuse to render its navigation.\n`);
    console.error(`  ✗ ${err.message}`);
    console.error(`    at structure path: ${err.path?.join(" / ") || "(root)"}`);
    if (err.helpId) console.error(`    https://www.sanity.io/help/${err.helpId}`);
    console.error(
      "\nIn a Hebrew Studio this is usually a node with a title and no .id():\n" +
        "the id derived from a Hebrew title is the empty string.\n",
    );
    process.exit(1);
  }
  throw err;
}

const report = [];
walk(serialized, "", new Set(), report);

const panes = [];
(function count(n) {
  if (!n || typeof n !== "object") return;
  if (n.id) panes.push(n.id);
  for (const item of n.items ?? []) count(item);
})(serialized);

console.log(`Studio structure: serialized ${panes.length} nodes.`);
console.log(`  root "${serialized.id}" -> ${(serialized.items ?? []).map((i) => i.id ?? i.type).join(", ")}`);

if (report.length) {
  console.error(`\n${report.length} problem(s) the Studio would hit at runtime:\n`);
  for (const r of report) console.error(`  ✗ ${r}`);
  console.error("");
  process.exit(1);
}

console.log("\nThe Studio navigation renders. ✓");
