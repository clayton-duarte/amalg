import { AppProps } from 'next/app';
import Head from 'next/head';

import Grid from '@amalg/grid';
import { ThemeProvider } from '@amalg/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Welcome to stocks-public!</title>
      </Head>
      <Grid p="1rem" xsy="1fr">
        <Component {...pageProps} />
      </Grid>
    </ThemeProvider>
  );
}

export default CustomApp;
