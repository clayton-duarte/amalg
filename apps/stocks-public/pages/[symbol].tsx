import Head from 'next/head';

import Chart, { getSemanticColor } from '@amalg/chart';
import { QuoteData, getQuote } from '@amalg/dividend-history';
import {
  calcCombinedCapitalAppreciation,
  calcAccumulatedDividends,
  flattenChartData,
  calcGrowth,
  ChartData,
} from '@amalg/financials';
import Grid from '@amalg/grid';
import { withParams } from '@amalg/page-decorators';
import PriceFluctuation from '@amalg/price-fluctuation';
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
  dividendAccumulated: ChartData[];
  dividendData: DividendData[];
  totalGainsData: ChartData[];
  historyData: HistoryData[];
  quoteData: QuoteData;
}

export const getStaticProps = withParams<SymbolPageProps, 'symbol'>(
  async (ctx) => {
    const { symbol } = ctx.params;

    const [quoteData, dividendData, historyData] = await Promise.all([
      getQuote(symbol),
      getYahooDividends(symbol),
      getYahooHistory(symbol),
    ]);

    const dividendAccumulated = calcAccumulatedDividends(dividendData);

    return {
      props: {
        symbol: symbol.toLocaleUpperCase(),
        dividendAccumulated,
        dividendData,
        historyData,
        quoteData,
        totalGainsData: flattenChartData(
          dividendAccumulated,
          historyData,
          calcCombinedCapitalAppreciation(dividendData, historyData)
        ),
      },
      revalidate: 60 * 60,
    };
  },
  'symbol'
);

export default function SymbolPage({
  dividendAccumulated,
  totalGainsData,
  dividendData,
  historyData,
  quoteData,
  symbol,
}: SymbolPageProps) {
  return (
    <>
      <Head>
        <title>{`${symbol} - Stocks Public`}</title>
      </Head>
      <Grid.Article>
        <Text.H1>{symbol}</Text.H1>
        <Table
          data={[quoteData]}
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
        <PriceFluctuation historyData={historyData} />
        <Grid.Section md="1fr 1fr">
          <Chart
            title="Total Gains"
            data={totalGainsData}
            seriesField="type"
            yAxis="amount"
            xAxis="date"
            color={[
              'INFO',
              getSemanticColor(calcGrowth(historyData)),
              'PRIMARY',
            ]}
          />
          <Chart
            title="Accumulated Dividends"
            data={dividendAccumulated}
            seriesField="type"
            yAxis="amount"
            xAxis="date"
            color="INFO"
          />
          <Chart
            title="Price History"
            data={historyData}
            yAxis="amount"
            xAxis="date"
          />
          <Chart
            title="Dividend History"
            data={dividendData}
            yAxis="amount"
            xAxis="date"
          />
        </Grid.Section>
      </Grid.Article>
    </>
  );
}
