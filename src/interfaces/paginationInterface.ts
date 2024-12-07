export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext?: boolean;
  type: 'small' | 'default' | 'admin';
}
