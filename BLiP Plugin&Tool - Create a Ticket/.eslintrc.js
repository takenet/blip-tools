module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [2, 'single', 'avoid-escape'],
    semi: ['error', 'never'],
    'space-in-parens': [2, 'never'],
    'space-before-function-paren': [
      'error',
      {
        asyncArrow: 'always',
        anonymous: 'always',
        named: 'never',
      },
    ],
    'template-curly-spacing': [2, 'never'],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'computed-property-spacing': [2, 'never'],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-use-before-define': [2, { functions: false }],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'prefer-const': 1,
    'react/prefer-es6-class': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-bind': [2, { allowArrowFunctions: true }],
    'react/jsx-curly-spacing': [2, { when: 'never', allowMultiline: false }],
    'react/jsx-indent': [2, 2],
    'react/prop-types': [1],
    'react/no-array-index-key': [1],
    'no-undef': [1],
    'no-case-declarations': [0],
    'no-return-assign': [1],
    'no-param-reassign': [1],
    'no-shadow': [1],
    camelcase: [1],
    'no-underscore-dangle': [0, 'always'],
  },
}
