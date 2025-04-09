// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    'prettier', // Disables ESLint rules that might conflict with Prettier
  ],
  rules: {
    'prettier/prettier': 'error', // Show Prettier formatting issues as ESLint errors
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
