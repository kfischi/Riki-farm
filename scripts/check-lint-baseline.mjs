/**
 * Fails when the number of ESLint errors grows.
 *
 * The rule is not "no errors", it is "no more errors than we already agreed to
 * live with". A gate that demands the impossible gets switched off, and a gate
 * that is off is how a catalogue prop holding thirteen CMS packages went
 * unnoticed for weeks.
 *
 * When you fix some, lower BASELINE. The check tells you to.
 *
 *   node scripts/check-lint-baseline.mjs
 */

import { ESLint } from "eslint";

/**
 * Accepted errors, 2026-09-17. Both are the same finding:
 *
 *   react-hooks/set-state-in-effect  components/CookieBanner.tsx:12
 *   react-hooks/set-state-in-effect  components/AccessibilityWidget.tsx:42
 *
 * Each reads localStorage in an effect and then sets state. That is the correct
 * shape for this problem, not an oversight: localStorage does not exist during
 * server rendering, so the value cannot be read in a lazy useState initialiser
 * without the server and the client disagreeing on the first paint. The rule is
 * right that it costs a second render; here that is the price of not shipping a
 * hydration mismatch.
 *
 * Left visible in this number rather than silenced with an eslint-disable, so
 * the trade-off stays in view. Removing them properly means useSyncExternalStore
 * with a server snapshot — worth doing when either component grows, and not
 * worth the risk for a cookie banner that renders once.
 *
 * The other nineteen errors this file used to carry were fixed on 2026-09-17:
 * thirteen `any` replaced with real types, three JSX entities escaped, a
 * @ts-ignore that turned out to be unnecessary, an empty interface, and a ref
 * assigned during render that is now assigned in an effect.
 */
const BASELINE = 2;

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
