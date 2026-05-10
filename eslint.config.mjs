import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarJs from 'eslint-plugin-sonarjs';

export default [
  { ignores: ['**/*.config.js', 'node_modules/**', 'build/**'] },
  ...nextCoreWebVitals,
  sonarJs.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/no-anonymous-default-export': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
];
