import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@amalg/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  console.log('pageProps', pageProps);

  return (
    <>
      <Head>
        <title>Welcome to stocks-private!</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default CustomApp;
