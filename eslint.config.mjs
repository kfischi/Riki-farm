import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      /**
       * Raised from a warning. A value computed and never used is usually work
       * that silently goes nowhere, and this repo has now found three:
       * a catalogue prop holding thirteen CMS packages that the section never
       * rendered, a placeholder component nothing mounted, and a Google review
       * link built in the footer and never shown. Each looked fine on the page.
       *
       * Prefixing with an underscore still opts out, for the genuinely unused
       * parameter you have to name.
       */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
