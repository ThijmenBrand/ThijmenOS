// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-await-in-loop": "error",
    "no-unused-private-class-members": "error",
    "block-scoped-var": "error",
    camelcase: "error",
    "capitalized-comments": ["error", "always"],
    complexity: ["error", 5],
    "consistent-return": "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": ["error"],
    "dot-notation": "error",
    eqeqeq: ["error", "always"],
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
