import Head from 'next/head';

import {
  getDividendHistory,
  DividendData,
  QuoteData,
} from '@amalg/dividend-history';
import Grid from '@amalg/grid';
import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';
import Text from '@amalg/text';
import { HistoryData } from '@amalg/yahoo-events';

export interface CompareProps {
  dividendHistoryList: DividendData[][];
  quoteList: QuoteData[];
  symbols: string[];
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
    const dividendDataList = await Promise.all(symbols.map(getDividendHistory));

    const quoteList = dividendDataList.map(
      (dividendHistory) => dividendHistory.quote
    );

    const dividendHistoryList = dividendDataList.map(
      (dividendHistory) => dividendHistory.dividends
    );

    return {
      props: {
        dividendHistoryList,
        quoteList,
        symbols,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbols'
);

export default function ComparePage({ quoteList, symbols }: CompareProps) {
  return (
    <>
      <Head>
        <title>
          {symbols.join(' & ').toLocaleUpperCase()}
          {' - Comparison - Stocks Public'}
        </title>
      </Head>
      <Grid.Article>
        <Text.H1>Welcome</Text.H1>
        <Table
          data={quoteList}
          headers={{
            symbol: 'Symbol',
            name: 'Name',
            closePrice: 'Close Price',
            divYieldPct: 'Dividend Yield',
            frequency: 'Frequency',
          }}
        />
      </Grid.Article>
      {/* <Chart data={quoteList} /> */}
    </>
  );
}
