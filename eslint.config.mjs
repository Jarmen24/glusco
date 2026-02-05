import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Adding rules to the configuration object
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disables errors for unused variables
      "@typescript-eslint/no-explicit-any": "off", // Disables errors for using 'any'
      "react/no-unescaped-entities": "off", // Prevents errors for simple quotes/apostrophes
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
