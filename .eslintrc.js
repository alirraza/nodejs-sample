module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': [
      'error',
      'never'
    ],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/extensions': 0,
    'no-useless-escape': 0,
    'no-underscore-dangle': 0,
    'no-loop-func': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-await-in-loop': 0
  }
};
