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
      <Text.H1>Symbol: {symbol}</Text.H1>
      <Text.H2>Dividend History</Text.H2>
      <Text>
        <Text.Strong>Name:</Text.Strong> {dividendHistory.name}
      </Text>
      <Text>
        <Text.Strong>Close Price:</Text.Strong> {dividendHistory.closePrice}
      </Text>
      <Text>
        <Text.Strong>Yield %:</Text.Strong> {dividendHistory.divYieldPct}%
      </Text>
      <Text>
        <Text.Strong>Frequency:</Text.Strong> {dividendHistory.frequency}
      </Text>
      <Text>
        <Text.Strong>PE:</Text.Strong> {dividendHistory.peRatio}
      </Text>
      <Table
        data={dividendHistory.data}
        headers={{
          amount: 'Amount',
          exDate: 'Ex Date',
          payDate: 'Pay Date',
          changePct: 'Change %',
        }}
      />
    </>
  );
}
