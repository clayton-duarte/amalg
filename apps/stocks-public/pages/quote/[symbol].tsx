import Chart from '@amalg/chart';
import { getDividendHistory, DividendData } from '@amalg/dividend-history';
import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';
import Text from '@amalg/text';

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface SymbolPageProps {
  symbol: string;
  dividendHistory: DividendData;
}

export const getStaticProps = withParams<SymbolPageProps, 'symbol'>(
  async (ctx) => {
    const { symbol } = ctx.params;
    const dividendHistory = await getDividendHistory(symbol);

    return {
      props: {
        symbol,
        dividendHistory,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbol'
);

export default function SymbolPage({
  symbol,
  dividendHistory,
}: SymbolPageProps) {
  return (
    <>
      <Text.H1>{symbol.toLocaleUpperCase()}</Text.H1>
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
        title="Dividend History"
        data={dividendHistory.history}
        xAxis="payDate"
        yAxis="amount"
        reversed
      />
      <Text.H2>Dividend History</Text.H2>
      <Table
        data={dividendHistory.history}
        headers={{
          exDate: 'Ex Date',
          amount: 'Amount',
          payDate: 'Pay Date',
          changePct: 'Change %',
        }}
      />
    </>
  );
}
