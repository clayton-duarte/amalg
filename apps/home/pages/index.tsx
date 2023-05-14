import Link from 'next/link';

import Grid from '@amalg/grid';

export default function HomePage() {
  return (
    <Grid p="1rem">
      <Link href="/public">public</Link>
      <Link href="/private">private</Link>
    </Grid>
  );
}
