import Head from 'next/head';

import { DividendData, getDividendHistory } from '@amalg/dividend-history';
import Grid from '@amalg/grid';
import { withParams } from '@amalg/page-decorators';
import Text from '@amalg/text';

export interface CompareProps {
  title: string;
  dividendHistoryList: DividendData[];
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = withParams<CompareProps, 'symbols', string[]>(
  async (ctx) => {
    const { symbols } = ctx.params;

    const dividendHistoryList = await Promise.all(
      symbols.map(getDividendHistory)
    );

    return {
      props: {
        title: 'compare',
        dividendHistoryList,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbols'
);

export default function ComparePage({
  title,
  dividendHistoryList,
}: CompareProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid.Article>
        <Text.H1>Welcome to {title} page!</Text.H1>
      </Grid.Article>
    </>
  );
}
