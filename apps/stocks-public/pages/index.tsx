import Button from '@amalg/button';
import Grid from '@amalg/grid';
import Text from '@amalg/text';

export default function HomePage() {
  return (
    <Grid xs="auto" justify="center" alignSelf="center">
      <Text.H1>Welcome to stocks-public!</Text.H1>
      <Button>do nothing</Button>
    </Grid>
  );
}
