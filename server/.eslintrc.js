module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports,
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "type|of|returns" }],
    "import/prefer-default-export": "off", // May drop default exports altogether https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    "import/no-cycle": "off",
    "no-console": "off",
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": "off",
    "no-underscore-dangle": [ "error", { allow: ["_id"] }],
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      /*ForOfStatement, */ "LabeledStatement",
      "WithStatement",
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: false,
        singleQuote: false,
        printWidth: 120,
        endOfLine: "auto",
      },
    ],
  },
};
