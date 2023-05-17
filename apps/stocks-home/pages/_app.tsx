import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@amalg/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to home!</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
