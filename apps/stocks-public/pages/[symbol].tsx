import Head from 'next/head';

import Chart from '@amalg/chart';
import {
  getDividendHistory,
  DividendHistoryData,
} from '@amalg/dividend-history';
import { calcAccumulatedDividends, ChartData } from '@amalg/financials';
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

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface SymbolPageProps {
  symbol: string;
  quoteDataList: DividendHistoryData;
  dividendDataList: DividendData[];
  historyDataList: HistoryData[];
  totalGainsDataList: ChartData[];
}

function trimArrays(...dataLists: ChartData[][]) {
  const minLen = Math.min(...dataLists.map((data) => data.length));

  return dataLists.map((list) => list.slice(0, minLen));
}

export const getStaticProps = withParams<SymbolPageProps, 'symbol'>(
  async (ctx) => {
    const { symbol } = ctx.params;

    const [quoteDataList, dividendDataList, historyDataList] =
      await Promise.all([
        getDividendHistory(symbol),
        getYahooDividends(symbol),
        getYahooHistory(symbol),
      ]);

    return {
      props: {
        symbol: symbol.toLocaleUpperCase(),
        dividendDataList,
        historyDataList,
        quoteDataList,
        totalGainsDataList: trimArrays(
          historyDataList,
          calcAccumulatedDividends(dividendDataList)
        )
          .flat()
          .sort((a, b) => a.date.localeCompare(b.date)),
      },
      revalidate: 60 * 60,
    };
  },
  'symbol'
);

export default function SymbolPage({
  totalGainsDataList,
  dividendDataList,
  historyDataList,
  quoteDataList,
  symbol,
}: SymbolPageProps) {
  return (
    <>
      <Head>
        <title>{symbol} - Stocks Public</title>
      </Head>
      <Grid.Article>
        <Text.H1>{symbol}</Text.H1>
        <Table
          data={[quoteDataList.quote]}
          headers={{
            name: 'Name',
            closePrice: {
              label: 'Close Price',
              format: 'currency',
            },
            divYieldPct: {
              label: 'Div Yield %',
              format: 'percent',
            },
            frequency: 'Frequency',
            peRatio: {
              label: 'P/E Ratio',
              format: (pe) => pe.toFixed(2),
            },
          }}
        />
        <Chart
          title="Total Gains"
          data={totalGainsDataList}
          seriesField="type"
          yAxis="amount"
          xAxis="date"
          isStack
        />
        <Grid.Section md="1fr 1fr">
          <Chart
            title="Price History"
            data={historyDataList}
            yAxis="amount"
            xAxis="date"
          />
          <Chart
            title="Dividend History"
            data={dividendDataList}
            yAxis="amount"
            xAxis="date"
          />
        </Grid.Section>
      </Grid.Article>
    </>
  );
}
