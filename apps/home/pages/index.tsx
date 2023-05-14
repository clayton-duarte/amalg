import Grid from '@amalg/grid';
import Link from '@amalg/link';

export default function HomePage() {
  return (
    <Grid align="start">
      <Link href="/public">public</Link>
      <Link href="/private">private</Link>
    </Grid>
  );
}
