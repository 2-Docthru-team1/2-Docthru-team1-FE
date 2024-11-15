import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2023, // ECMAScript 버전 설정
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // JSX 구문 활성화
        },
      },
    },
  },
  {
    plugins: {
      prettier: pluginPrettier,
      'jsx-a11y': pluginJsxA11y,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: true,
        alias: {
          map: [
            ['@api/*', './src/api'],
            ['@app/*', './src/app'],
            ['@components/*', './src/components'],
            ['@contexts/*', './src/contexts'],
            ['@hooks/*', './src/hooks'],
            ['@interfaces/*', './src/interfaces'],
            ['@styles/*', './src/styles'],
            ['@utils/*', './src/utils'],
            ['@variables/*', './src/variables'],
            ['@', './'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
      'import/internal-regex': '@/',
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-globals': 'off',
      'no-lone-blocks': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
      'react/jsx-uses-react': 'off', // React 17+에서는 필요 없음
      'no-bitwise': 'off',
      'react/prop-types': 'off',
      'consistent-return': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
      'guard-for-in': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // 명시적 any 사용 시 경고
      // NOTE JS/TS 관련 확장자만 생략한다.
      'import/extensions': ['error', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', css: 'always' }],
      'import/no-duplicates': ['warn', { 'prefer-inline': true, considerQueryString: true }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'never',
          distinctGroup: false,
          pathGroups: [
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'axios',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@api/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@contexts/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@hooks/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@interfaces/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@styles/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@variables/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
    },
  },
];
