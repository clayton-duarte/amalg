import Head from 'next/head';

import Chart from '@amalg/chart';
import { getDividendHistory, QuoteData } from '@amalg/dividend-history';
import Grid from '@amalg/grid';
import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';
import Text from '@amalg/text';
import {
  getYahooDividends,
  getYahooHistory,
  DividendData,
  HistoryData,
} from '@amalg/yahoo-events';

export interface CompareProps {
  dividendList: DividendData[];
  historyList: HistoryData[];
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

    const [quoteDataList, dividendDataList, historyDataList] =
      await Promise.all([
        Promise.all(symbols.map(getDividendHistory)),
        Promise.all(symbols.map(getYahooDividends)),
        Promise.all(symbols.map(getYahooHistory)),
      ]);

    const quoteList = quoteDataList.map(({ quote }) => quote);
    const historyList = historyDataList.flat();

    const dividendList = dividendDataList
      .flat()
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      props: {
        dividendList,
        historyList,
        quoteList,
        symbols,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbols'
);

export default function ComparePage({
  dividendList,
  historyList,
  quoteList,
  symbols,
}: CompareProps) {
  console.log(dividendList.flat());

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
        <Chart
          title="Price History"
          data={historyList}
          seriesField="symbol"
          yAxis="close"
          xAxis="date"
        />
        <Chart
          title="Dividend History"
          data={dividendList}
          seriesField="symbol"
          yAxis="amount"
          xAxis="date"
        />
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
    </>
  );
}
