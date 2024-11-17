import type { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import type { PaginationProps } from '@/interfaces/paginationInterface';

const meta: Meta<PaginationProps> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    onPageChange: { action: 'page changed' }
  }
};

export default meta;

const Template: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
};

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  hasNext: true
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentPage: 5,
  totalPages: 10,
  onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  hasNext: true
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 10,
  totalPages: 10,
  onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  hasNext: false
};

export const FirstPage = Template.bind({});
FirstPage.args = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  hasNext: true
};
