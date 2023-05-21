import Head from 'next/head';

import Chart from '@amalg/chart';
import { getDividendHistory, QuoteData } from '@amalg/dividend-history';
import {
  calcCombinedCapitalAppreciationPercent,
  calcComposedDividendsPercent,
  mapChartDataToPercent,
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
  historyList: ChartData[];
  dividendList: ChartData[];
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

    return {
      props: {
        symbols,
        quoteList: quoteDataList.map(({ quote }) => quote),
        historyList: historyDataList.map(mapChartDataToPercent).flat(),
        dividendList: dividendDataList
          .map(mapChartDataToPercent)
          .flat()
          .sort((a, b) => a.date.localeCompare(b.date)),
        dividendAccumulatedList: symbols
          .map((_, index) =>
            calcComposedDividendsPercent(
              dividendDataList[index],
              historyDataList[index]
            )
          )
          .flat()
          .sort((a, b) => a.date.localeCompare(b.date)),
        totalGainsDataList: symbols
          .map((_, index) =>
            calcCombinedCapitalAppreciationPercent(
              dividendDataList[index],
              historyDataList[index]
            )
          )
          .flat(),
      },
      revalidate: 60 * 60,
    };
  },
  'symbols'
);

export default function ComparePage({
  dividendAccumulatedList,
  totalGainsDataList,
  dividendList,
  historyList,
  quoteList,
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
          data={quoteList}
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
            frequency: 'Frequency',
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
