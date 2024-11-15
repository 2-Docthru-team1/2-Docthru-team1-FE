export default {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 130,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'auto',

  // import 정렬 설정
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@api/(.*)$',
    '^@app/(.*)$',
    '^@components/(.*)$',
    '^@contexts/(.*)$',
    '^@hooks/(.*)$',
    '^@interfaces/(.*)$',
    '^@styles/(.*)$',
    '^@utils/(.*)$',
    '^@variables/(.*)$',
    '^@/(.*)$',
    '^.*\\.(svg|jpg|jpeg|png)$',
    '^.*\\.css$',
    '^[./]'
  ],
  // importOrderSeparation: false, // import 그룹 사이 빈 줄 없음
  // importOrderSortSpecifiers: true, // import 구문 내 사양자 정렬
  // importOrderCaseInsensitive: false, // 대소문자 구분
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true
};
