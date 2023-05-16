import Grid from '@amalg/grid';
import Link, { NextLink } from '@amalg/link';
import Text from '@amalg/text';

export default function HomePage() {
  return (
    <Grid xs="auto" justify="center" alignSelf="center">
      <Text.H1>Welcome to stocks-public!</Text.H1>
      <Link href="/" disabled>
        home
      </Link>
      <NextLink href="/quote">quote</NextLink>
      <NextLink href="/compare">compare</NextLink>
    </Grid>
  );
}
