import tseslint from 'typescript-eslint';

export default [
  {
    ...tseslint.configs.recommended,
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/eslint-plugin': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
