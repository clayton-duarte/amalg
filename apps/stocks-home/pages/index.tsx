import Grid from '@amalg/grid';
import { NextLink } from '@amalg/link';

export default function HomePage() {
  return (
    <Grid align="start">
      <NextLink href="/public">public</NextLink>
      <NextLink href="/private">private</NextLink>
    </Grid>
  );
}
