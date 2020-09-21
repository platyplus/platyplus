module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  plugins: [
    // Required to apply rules which need type information
    '@typescript-eslint',
    'simple-import-sort',
    // Required to lint *.vue files
    // See https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // * 'vue',
    // Prettier has not been included as plugin to avoid performance impact
    // See https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Add it as an extension
  ],

  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',
    // Usage with Prettier, provided by 'eslint-config-prettier'.
    // See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    // `plugin:vue/essential` by default, consider switching to `plugin:vue/strongly-recommended`
    //  or `plugin:vue/recommended` for stricter rules.
    // See https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/essential',

    // Usage with Prettier, provided by 'eslint-config-prettier'.
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage-with-prettier
    'prettier',
    'prettier/@typescript-eslint',
    // * 'prettier/vue',
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
  },

  rules: {
    'prefer-promise-reject-errors': 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Custom
    //* 'vue/component-name-in-template-casing': ['error', 'kebab-case'],

    'simple-import-sort/sort': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],

      // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
      // See https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
      // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      // add your custom rules here
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // '@typescript-eslint/camelcase': 'warn', // ? hasura snake/camel case names?
        // '@typescript-eslint/indent': 'off', // * still some issues with this rule. Disabling and trusting prettier...
        // '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/no-empty-interface': 'warn',
      },
    },
  ],
}
