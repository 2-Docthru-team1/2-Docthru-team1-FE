import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/reset.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HanCook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={pretendard.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
