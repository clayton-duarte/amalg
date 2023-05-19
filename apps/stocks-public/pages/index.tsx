import Head from 'next/head';

import Grid from '@amalg/grid';
import Link, { NextLink } from '@amalg/link';
import Text from '@amalg/text';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - Stocks Public</title>
      </Head>
      <Grid.Article>
        <Text.H1>Welcome to stocks-public!</Text.H1>
        <Link href="/">home</Link>
        <NextLink href="/vdy.to">quote example</NextLink>
        <NextLink href="/vdy.to/vfv.to">compare example</NextLink>
      </Grid.Article>
    </>
  );
}
