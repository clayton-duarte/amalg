import Head from 'next/head';

import Grid from '@amalg/grid';
import { NextLink } from '@amalg/link';
import Text from '@amalg/text';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Stocks Home</title>
      </Head>
      <Grid.Article>
        <Text.H1>Welcome to stocks-home!</Text.H1>
        <NextLink href="/public">public</NextLink>
        <NextLink href="/private">private</NextLink>
      </Grid.Article>
    </>
  );
}
