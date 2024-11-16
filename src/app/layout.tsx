'use client';

import localFont from 'next/font/local';
import { useState } from 'react';
import Nav from '@/components/Nav/Nav';
import XModal from '@/components/XModal/XModal';
import '../styles/globals.css';
import { metadata } from './metadata';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={pretendard.className}>
        <Nav userStatus="adminUser" setIsModalOpen={setIsModalOpen} />
        {children}
        <XModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </body>
    </html>
  );
}
