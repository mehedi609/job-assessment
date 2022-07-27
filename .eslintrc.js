module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  plugins: ['import', 'prettier', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: { 'jest/globals': true },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
  env: {
    jest: true,
  },
  rules: {
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'function-paren-newline': 'off',
    'no-confusing-arrow': 'off',
    '@typescript-eslint/indent': 'off',
    'prefer-destructuring': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
