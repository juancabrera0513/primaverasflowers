/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "unused-imports"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
};
