import Head from 'next/head';

import Grid from '@amalg/grid';

export interface CompareProps {
  title: string;
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'compare',
    },
  };
};

export default function ComparePage({ title }: CompareProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid>
        <h1>Welcome to {title} page!</h1>
      </Grid>
    </>
  );
}
