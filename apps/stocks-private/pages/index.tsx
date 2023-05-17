import Head from 'next/head';

import Grid from '@amalg/grid';
import Text from '@amalg/text';

export default function Index() {
  return (
    <>
      <Head>
        <title>Home - Stocks Private</title>
      </Head>
      <Grid.Article>
        <Text.H1>Stocks Private</Text.H1>
        <Text>works</Text>
      </Grid.Article>
    </>
  );
}
