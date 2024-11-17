import localFont from 'next/font/local';
import Nav from '@/components/Nav/Nav';
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>{metadata.title!}</title>
        <meta name="description" content={metadata.description!} />
      </head>
      <body className={pretendard.className}>
        <Nav userStatus="loggedOut" />
        {children}
      </body>
    </html>
  );
}
