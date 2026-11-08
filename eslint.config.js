import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Class strings that break the design system's rules (§5.4, §9, §13).
 * Kept as one table so the reason for each ban is written down once.
 */
const bannedPatterns = [
  {
    selector: "Literal[value=/(^|[\\s:])(pl|pr|ml|mr|left|right|space-x|divide-x)-/]",
    message:
      "Use logical properties only (ps-, pe-, ms-, me-, start-, end-, text-start, text-end) — the page ships an RTL locale.",
  },
  {
    selector: "Literal[value=/#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?\\b/]",
    message: "No raw hex values in components. Use a design token utility (bg-panel, text-muted, border-line…).",
  },
  {
    selector: "Literal[value=/(blur-3xl|rounded-3xl|rounded-2xl|bg-gradient|from-indigo|to-violet|animate-pulse)/]",
    message: "Banned pattern (§13): no glows, no gradients, no radii above 14px, no pulsing decorations.",
  },
];

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**", ".cache/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactHooks.configs["recommended-latest"],

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-console": ["error", { allow: ["error", "warn"] }],
      eqeqeq: ["error", "always"],
    },
  },

  {
    files: ["src/components/**/*.tsx", "src/sections/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...bannedPatterns.map(({ selector, message }) => ({ selector, message }))],
    },
  },

  {
    files: ["vite.config.ts", "scripts/**/*.mjs", "eslint.config.js"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { projectService: false },
    },
  },
  {
    // Browser callbacks in the Playwright and OG-generation scripts execute
    // in the page, even though the scripts themselves run in Node.
    files: ["scripts/**/*.mjs"],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
);
