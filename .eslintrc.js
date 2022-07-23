module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  plugins: ['import', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
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
  },
};
