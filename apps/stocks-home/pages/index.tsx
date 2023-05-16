import Grid from '@amalg/grid';
import { NextLink } from '@amalg/link';
import Text from '@amalg/text';

export default function HomePage() {
  return (
    <Grid xs="auto" justify="center" alignSelf="center">
      <Text.H1>Welcome to stocks-home!</Text.H1>
      <NextLink href="/public">public</NextLink>
      <NextLink href="/private">private</NextLink>
    </Grid>
  );
}
