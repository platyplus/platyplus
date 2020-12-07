module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],

  extends: ['eslint:recommended', 'prettier'],
  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true
  },
  parserOptions: {
    sourceType: 'module'
  },

  rules: {
    'prefer-promise-reject-errors': 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'warn',
    // Custom
    //* 'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'simple-import-sort/imports': 'error'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      plugins: ['vue'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:vue/vue3-recommended',
        'prettier/vue'
      ],
      // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
      // See https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
      // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue']
      },
      // add your custom rules here
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // '@typescript-eslint/camelcase': 'warn', // ? hasura snake/camel case names?
        '@typescript-eslint/no-empty-interface': 'warn'
      }
    }
  ]
}
