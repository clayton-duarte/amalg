import Head from 'next/head';

import Chart from '@amalg/chart';
import { getQuote, QuoteData } from '@amalg/dividend-history';
import {
  mapCalcCombinedCapitalAppreciationPercent,
  flattenChartDataPercent,
  calcAccumulatedDividends,
  flattenChartData,
  ChartData,
} from '@amalg/financials';
import Grid from '@amalg/grid';
import { NextLink } from '@amalg/link';
import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';
import Text from '@amalg/text';
import { getYahooDividends, getYahooHistory } from '@amalg/yahoo-events';

export interface CompareProps {
  dividendAccumulatedList: ChartData[];
  totalGainsDataList: ChartData[];
  quoteDataList: QuoteData[];
  dividendList: ChartData[];
  historyList: ChartData[];
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
        Promise.all(symbols.map(getQuote)),
        Promise.all(symbols.map(getYahooDividends)),
        Promise.all(symbols.map(getYahooHistory)),
      ]);

    return {
      props: {
        symbols,
        quoteDataList,
        historyList: flattenChartDataPercent(...historyDataList),
        dividendList: flattenChartDataPercent(...dividendDataList),
        dividendAccumulatedList: flattenChartData(
          ...dividendDataList.map(calcAccumulatedDividends)
        ),
        totalGainsDataList: flattenChartData(
          ...symbols.map(
            mapCalcCombinedCapitalAppreciationPercent(
              dividendDataList,
              historyDataList
            )
          )
        ),
      },
      revalidate: 60 * 60,
    };
  },
  'symbols'
);

export default function ComparePage({
  dividendAccumulatedList,
  totalGainsDataList,
  quoteDataList,
  dividendList,
  historyList,
  symbols,
}: CompareProps) {
  const symbolList = symbols.join(' & ').toLocaleUpperCase();

  return (
    <>
      <Head>
        <title>{`${symbolList} - Comparison - Stocks Public`}</title>
      </Head>
      <Grid.Article>
        <Text.H1>{symbolList}</Text.H1>
        <Table
          data={quoteDataList}
          headers={{
            symbol: {
              label: 'Symbol',
              format: (symbol: string) => (
                <NextLink href={`/${symbol}`}>{symbol}</NextLink>
              ),
            },
            name: 'Name',
            closePrice: {
              label: 'Close Price',
              format: 'currency',
            },
            divYieldPct: {
              label: 'Dividend Yield',
              format: 'percent',
            },
            frequency: {
              label: 'Frequency',
              format: (frequency: string) =>
                frequency.replace('Unknown', 'N/A'),
            },
          }}
        />
        <Grid md="1fr 1fr">
          <Chart
            title="Total Gains"
            data={totalGainsDataList}
            seriesField="symbol"
            format="percent"
            yAxis="amount"
            xAxis="date"
          />
          <Chart
            title="Dividend Accumulation"
            data={dividendAccumulatedList}
            seriesField="symbol"
            format="percent"
            yAxis="amount"
            xAxis="date"
          />
          <Chart
            title="Price History"
            data={historyList}
            seriesField="symbol"
            format="percent"
            yAxis="amount"
            xAxis="date"
          />
          <Chart
            title="Dividend History"
            data={dividendList}
            seriesField="symbol"
            format="percent"
            yAxis="amount"
            xAxis="date"
          />
        </Grid>
      </Grid.Article>
    </>
  );
}
