import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Nav from '@/components/Nav/Nav';
import '../styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: 'HanCook',
  description: 'The web that you can share your korean food cooking'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={pretendard.className}>
        <Nav userStatus="loggedOut" />
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
