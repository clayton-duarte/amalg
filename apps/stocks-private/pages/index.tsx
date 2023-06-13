import Head from 'next/head';
// import { useSession, signIn, signOut } from 'next-auth/react';

// import Button from '@amalg/button';
import Grid from '@amalg/grid';
import Text from '@amalg/text';

export default function Index() {
  // const session = useSession();

  return (
    <>
      <Head>
        <title>Home - Stocks Private</title>
      </Head>
      <Grid.Article>
        <Text.H1>Stocks Private</Text.H1>
        <Text>works</Text>
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        <Grid xs="auto auto">
          {/* <Button onClick={() => signIn()}>Sign In</Button>
          <Button onClick={() => signOut()}>Sign Out</Button> */}
        </Grid>
      </Grid.Article>
    </>
  );
}
