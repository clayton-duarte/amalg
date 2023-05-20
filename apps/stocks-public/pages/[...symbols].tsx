import Head from 'next/head';

import Chart, { ChartData } from '@amalg/chart';
import { getDividendHistory, QuoteData } from '@amalg/dividend-history';
import {
  calcCombinedCapitalAppreciationPercent,
  mapDividendDataToProportional,
  mapHistoryDataToProportional,
} from '@amalg/financials';
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
  totalGainsDataList: ChartData[];
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

    const historyList = historyDataList
      .map(mapHistoryDataToProportional)
      .flat();

    const dividendList = dividendDataList
      .map(mapDividendDataToProportional)
      .flat()
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      props: {
        symbols,
        dividendList,
        historyList,
        quoteList,
        totalGainsDataList: symbols
          .map((_, index) =>
            calcCombinedCapitalAppreciationPercent(
              dividendDataList[index],
              historyDataList[index]
            )
          )
          .flat(),
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbols'
);

export default function ComparePage({
  totalGainsDataList,
  dividendList,
  historyList,
  quoteList,
  symbols,
}: CompareProps) {
  const symbolList = symbols.join(', ').toLocaleUpperCase();

  return (
    <>
      <Head>
        <title>
          {symbols.join(' & ').toLocaleUpperCase()}
          {' - Comparison - Stocks Public'}
        </title>
      </Head>
      <Grid.Article>
        <Text.H1>{symbolList}</Text.H1>
        <Table
          data={quoteList}
          renderLinks={{
            symbol: (symbol) => `/${symbol}`,
          }}
          headers={{
            symbol: 'Symbol',
            name: 'Name',
            closePrice: 'Close Price',
            divYieldPct: 'Dividend Yield',
            frequency: 'Frequency',
          }}
        />
        <Chart
          title="Performance History"
          data={totalGainsDataList}
          seriesField="symbol"
          yAxis="amount"
          xAxis="date"
        />
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
      </Grid.Article>
    </>
  );
}
