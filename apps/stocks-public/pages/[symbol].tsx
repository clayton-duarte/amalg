import Head from 'next/head';

import Chart, { ChartData } from '@amalg/chart';
import {
  getDividendHistory,
  DividendHistoryData,
} from '@amalg/dividend-history';
import {
  calcCombinedCapitalAppreciation,
  calcComposedDividends,
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
        dividendDataList,
        historyDataList,
        quoteDataList,
        symbol: symbol.toLocaleUpperCase(),
        totalGainsDataList: calcCombinedCapitalAppreciation(
          calcComposedDividends(dividendDataList, historyDataList),
          historyDataList
        ),
      },
      revalidate: 60 * 60 * 24, // 24 hours
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
            closePrice: 'Close Price',
            divYieldPct: 'Yield %',
            frequency: 'Frequency',
            peRatio: 'PE',
          }}
        />
        <Chart
          title="Total Gains"
          data={totalGainsDataList}
          xAxis="date"
          yAxis="amount"
        />
        <Chart
          title="Price History"
          data={historyDataList}
          yAxis="close"
          xAxis="date"
        />
        <Chart
          title="Dividend History"
          data={dividendDataList}
          yAxis="amount"
          xAxis="date"
        />
      </Grid.Article>
    </>
  );
}
