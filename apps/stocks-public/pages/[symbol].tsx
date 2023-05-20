import Head from 'next/head';

import Chart from '@amalg/chart';
import {
  getDividendHistory,
  DividendHistoryData,
} from '@amalg/dividend-history';
import Grid from '@amalg/grid';
import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';
import Text from '@amalg/text';
import { getYahooHistory, HistoryData } from '@amalg/yahoo-events';

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface SymbolPageProps {
  symbol: string;
  dividendHistory: DividendHistoryData;
  history: HistoryData[];
}

export const getStaticProps = withParams<SymbolPageProps, 'symbol'>(
  async (ctx) => {
    const { symbol } = ctx.params;
    const dividendHistory = await getDividendHistory(symbol);
    const history = await getYahooHistory(symbol);

    return {
      props: {
        dividendHistory,
        history,
        symbol,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbol'
);

export default function SymbolPage({
  symbol,
  dividendHistory,
  history,
}: SymbolPageProps) {
  const formattedSymbol = symbol.toLocaleUpperCase();

  return (
    <>
      <Head>
        <title>{formattedSymbol} - Stocks Public</title>
      </Head>
      <Grid.Article>
        <Text.H1>{formattedSymbol}</Text.H1>
        <Table
          data={[dividendHistory.quote]}
          headers={{
            name: 'Name',
            closePrice: 'Close Price',
            divYieldPct: 'Yield %',
            frequency: 'Frequency',
            peRatio: 'PE',
          }}
        />
        <Chart
          title="Price History"
          data={history}
          xAxis="date"
          yAxis="close"
        />
        <Chart
          title="Dividend History"
          data={dividendHistory.dividends}
          xAxis="payDate"
          yAxis="amount"
          reversed
        />
        <Text.H2>Dividend History</Text.H2>
        <Table
          data={dividendHistory.dividends}
          headers={{
            exDate: 'Ex Date',
            amount: 'Amount',
            payDate: 'Pay Date',
            changePct: 'Change %',
          }}
        />
      </Grid.Article>
    </>
  );
}
