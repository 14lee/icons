const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    '@smart/typescript',
  ],
  rules: {
    'semi': ['warn', 'always'],
    'indent': [
      'warn',
      2,
      {
        'SwitchCase': 1,
        'ignoredNodes': ['VariableDeclaration[declarations.length=0]']
      }
    ],
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-redeclare': 'off',

    'import/no-relative-packages': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-parens': ['error', 'always']
  },
});
