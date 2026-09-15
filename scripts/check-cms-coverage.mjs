/**
 * Fails when the Studio offers a field the site never reads.
 *
 * This project shipped a catalogue section that took its packages as a prop and
 * rendered a hardcoded collage instead, so thirteen documents an editor could
 * carefully maintain reached no visitor for weeks. The interface looked like it
 * worked. That class of failure is silent by construction — a form that changes
 * nothing behaves exactly like a form that works — so it needs a machine to
 * notice, not a reviewer.
 *
 * The rule this enforces: every field an editor can fill is either fetched by a
 * query, or declared unreachable on purpose.
 *
 * What it does NOT catch: data that is fetched and then dropped by a component,
 * which is what happened here. ESLint's no-unused-vars reports that one, and
 * this repo now treats it as an error. The two checks together cover the path
 * from schema to screen; neither covers it alone.
 *
 *   node scripts/check-cms-coverage.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

/** Fields every document carries; never authored, never declared. */
const SYSTEM_FIELDS = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt"]);

/**
 * The schemas are TypeScript. Rather than parse them — the brittle option that
 * drifts the moment someone reformats a file — compile them with the tsc that
 * the project already depends on and import the real objects.
 */
function loadSchemaModules() {
  const out = mkdtempSync(join(tmpdir(), "cms-coverage-"));
  try {
    execFileSync(
      "npx",
      [
        "tsc", "sanity/index.ts", "sanity/studio-policy.ts",
        "--outDir", out,
        "--module", "commonjs",
        "--moduleResolution", "node",
        "--target", "es2022",
        "--skipLibCheck",
        "--esModuleInterop",
      ],
      { cwd: ROOT, stdio: "pipe" },
    );
  } catch (err) {
    const detail = [err.stdout, err.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`the schemas did not compile:\n${detail || err.message}`);
  }
  return { dir: out, indexPath: join(out, "index.js"), policyPath: join(out, "studio-policy.js") };
}

/**
 * Flattens a schema into "package.image.alt" style paths.
 * A field marked `hidden` stops the walk: it and everything under it is a
 * declaration that this branch reaches no page.
 */
function fieldPaths(fields, prefix, out = []) {
  for (const field of fields ?? []) {
    if (!field?.name) continue;
    const path = `${prefix}.${field.name}`;
    if (field.hidden === true) {
      out.push({ path, declaredHidden: true });
      continue;
    }
    out.push({ path, declaredHidden: false });
    // Objects and images nest; arrays carry their shape in `of` and are covered
    // by whether the array itself is fetched.
    if (Array.isArray(field.fields)) fieldPaths(field.fields, path, out);
  }
  return out;
}

/**
 * Pulls "which top-level keys does this type's query ask for" out of the GROQ
 * in lib/sanity.ts. Deliberately strict: a query shape it cannot read is
 * reported rather than skipped, because silently passing is the whole problem.
 */
function groqProjections(source) {
  const byType = new Map();
  const unreadable = [];

  for (const literal of source.match(/`[^`]*`/g) ?? []) {
    const typeMatch = literal.match(/_type\s*==\s*"([^"]+)"/);
    if (!typeMatch) continue;
    const type = typeMatch[1];

    const open = literal.indexOf("{", typeMatch.index);
    if (open === -1) {
      unreadable.push(`${type}: query selects no projection block`);
      continue;
    }
    // Walk to the matching brace so a nested projection does not truncate it.
    let depth = 0;
    let close = -1;
    for (let i = open; i < literal.length; i++) {
      if (literal[i] === "{") depth++;
      else if (literal[i] === "}" && --depth === 0) { close = i; break; }
    }
    if (close === -1) {
      unreadable.push(`${type}: unbalanced braces in projection`);
      continue;
    }

    const keys = new Set();
    for (const part of literal.slice(open + 1, close).split(/[,\n]/)) {
      // Handles `name`, `"alias": expr` and `field->`; we only need the name
      // the document actually stores.
      const key = part.trim().split(/[:(\[-]/)[0].trim().replace(/^"|"$/g, "");
      if (key && /^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) keys.add(key);
    }
    byType.set(type, new Set([...(byType.get(type) ?? []), ...keys]));
  }
  return { byType, unreadable };
}

function main() {
  const { dir, indexPath, policyPath } = loadSchemaModules();
  let schemas, UNRENDERED_TYPES;
  try {
    ({ schemas } = require(indexPath));
    ({ UNRENDERED_TYPES } = require(policyPath));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  const source = readFileSync(join(ROOT, "lib", "sanity.ts"), "utf8");
  const { byType, unreadable } = groqProjections(source);

  const failures = [];
  const declared = [];
  let checked = 0;

  for (const schema of schemas) {
    const type = schema.name;

    if (UNRENDERED_TYPES.has(type)) {
      declared.push(`${type} — whole type declared unrendered`);
      continue;
    }

    const projection = byType.get(type);
    if (!projection) {
      failures.push(
        `${type}: editable in the Studio but no query fetches it. ` +
          `Either read it somewhere, or add it to UNRENDERED_TYPES in sanity/studio-policy.ts.`,
      );
      continue;
    }

    for (const { path, declaredHidden } of fieldPaths(schema.fields, type)) {
      const [, top] = path.split(".");
      if (SYSTEM_FIELDS.has(top)) continue;
      if (declaredHidden) {
        declared.push(`${path} — field marked hidden`);
        continue;
      }
      checked++;
      // A selected parent brings its children along, so any covered prefix counts.
      if (!projection.has(top)) {
        failures.push(
          `${path}: editable in the Studio, but "${top}" is not in the ${type} projection in lib/sanity.ts.`,
        );
      }
    }
  }

  console.log(`CMS coverage: ${checked} editable fields checked across ${schemas.length} types.`);
  if (declared.length) {
    console.log(`\n${declared.length} declared unreachable on purpose:`);
    for (const d of declared) console.log(`  · ${d}`);
  }
  if (unreadable.length) {
    console.log("\nQueries this check could not read:");
    for (const u of unreadable) console.log(`  ? ${u}`);
  }
  if (failures.length) {
    console.error(`\n${failures.length} field(s) an editor can fill that the site never reads:\n`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    console.error("\nA form whose changes go nowhere is worse than a missing form:");
    console.error("it looks like it works.\n");
    process.exit(1);
  }
  console.log("\nEvery editable field is fetched. ✓");
}

// `require` from an ES module, for the CommonJS the compiler emits.
const { createRequire } = await import("node:module");
const require = createRequire(import.meta.url);

main();
