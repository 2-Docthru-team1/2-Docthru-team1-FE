import type { ReactNode } from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <HeaderStyled>{children}</HeaderStyled>;
}
