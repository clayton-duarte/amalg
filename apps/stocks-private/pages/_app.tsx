import { AppProps } from 'next/app';
import Head from 'next/head';

import Grid from '@amalg/grid';
import { ThemeProvider } from '@amalg/theme';

const Main = Grid.withComponent('main');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Welcome to stocks-private!</title>
      </Head>
      <Main p="1rem" xsy="1fr">
        <Component {...pageProps} />
      </Main>
    </ThemeProvider>
  );
}

export default CustomApp;
