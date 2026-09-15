/**
 * Fails when the number of ESLint errors grows.
 *
 * The repo carries errors that predate this work — mostly `any` in the schema
 * files, plus three React findings whose fixes carry behavioural risk. Demanding
 * zero today would mean either rushing those fixes or turning the gate off, and
 * a gate that is off is how the catalogue prop went thirteen packages' worth of
 * unnoticed for weeks.
 *
 * So the rule is not "no errors", it is "no more errors than we already agreed
 * to live with". New code gets held to a clean standard; the backlog is visible
 * and shrinkable rather than silently permanent.
 *
 * When you fix some, lower BASELINE. The check tells you to.
 *
 *   node scripts/check-lint-baseline.mjs
 */

import { ESLint } from "eslint";

/**
 * Accepted pre-existing errors, 2026-09-15. Breakdown at that point:
 *   13  @typescript-eslint/no-explicit-any        (schema files, lib/sanity.ts)
 *    3  react/no-unescaped-entities
 *    2  react-hooks/set-state-in-effect
 *    1  react-hooks/refs                          (ref read during render)
 *    1  @typescript-eslint/ban-ts-comment
 *    1  @typescript-eslint/no-empty-object-type
 */
const BASELINE = 21;

const eslint = new ESLint();
const results = await eslint.lintFiles(["."]);

const errors = results.reduce((n, r) => n + r.errorCount, 0);
const warnings = results.reduce((n, r) => n + r.warningCount, 0);

const byRule = new Map();
for (const result of results) {
  for (const m of result.messages) {
    if (m.severity !== 2) continue;
    const rule = m.ruleId ?? "(no rule)";
    byRule.set(rule, (byRule.get(rule) ?? 0) + 1);
  }
}

console.log(`ESLint: ${errors} errors, ${warnings} warnings (baseline ${BASELINE}).`);

if (errors > BASELINE) {
  console.error(`\n${errors - BASELINE} new error(s). Current breakdown:\n`);
  for (const [rule, n] of [...byRule].sort((a, b) => b[1] - a[1])) {
    console.error(`  ${String(n).padStart(3)}  ${rule}`);
  }
  console.error("\nFix them, or say why the baseline should move.\n");
  process.exit(1);
}

if (errors < BASELINE) {
  console.log(
    `\n${BASELINE - errors} fewer than the baseline. ` +
      `Lower BASELINE in scripts/check-lint-baseline.mjs to ${errors} so the ground stays held.`,
  );
}

console.log("No new lint errors. ✓");
