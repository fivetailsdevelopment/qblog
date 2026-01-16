// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import next from "eslint-config-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Ignore build output etc.
  { ignores: [".next/**", "node_modules/**", "out/**", "dist/**"] },

  // ✅ Tell ESLint how to parse your source (JS + JSX)
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Next flat configs (if present in your version)
  ...(next.configs?.flat?.["core-web-vitals"] ??
    next.configs?.flat?.coreWebVitals ??
    []),
];