import axios from 'axios';
import * as cheerio from 'cheerio';

const TICKER_NAME_SELECTOR =
  'body > div > div:nth-child(2) > div:nth-child(2) > h4';

const QUOTE_DATA_SELECTOR =
  'body > div > div:nth-child(3) > div.col-md-8.col-xs-12.col-sm-12 > p';

const DIVIDEND_TABLE_SELECTOR = '#dividend_table > tbody';

export interface DividendHistoryData {
  changePct: number;
  payDate: string;
  exDate: string;
  amount: number;
}

const columnMap = ['exDate', 'payDate', 'amount', 'changePct'] as const;
const COLUMN_COUNT = 5;

export interface QuoteData {
  symbol: string;
  name: string;
  closePrice: string;
  divYieldPct: string;
  peRatio: string;
  frequency: string;
}

export interface DividendData {
  quote: QuoteData;
  history: DividendHistoryData[];
}

const CLOSE_PRICE_LABEL = 'Last Close Price: $';
const NEXT_EARNINGS_LABEL = 'Next Earnings:';
const YIELD_LABEL = 'Yield:';
const PAYOUT_LABEL = 'Payout Ratio:';
const PE_LABEL = 'PE Ratio:';
const MARKETCAP_LABEL = 'Market Cap:';
const FREQUENCY_LABEL = 'Frequency:';
const TABLE_LABEL = 'Dividend History (adjusted for splits)';

const mapExchange = {
  TO: 'TSX',
  V: 'TSXV',
  TSE: 'TSE',
  T: 'TSE',
  TYO: 'TSE',
  JP: 'TSE',
  CN: 'CNSX',
  NEO: 'NEO',
  NY: 'NYSE',
  NYA: 'NYSE',
  NYQ: 'NYSE',
  NYSE: 'NYSE',
  NYSEAMERICAN: 'NYSEAMERICAN',
  NS: 'NSE',
  NSE: 'NSE',
  AS: 'ASX',
  ASX: 'ASX',
  AX: 'ASX',
  L: 'LSE',
  LSE: 'LSE',
  LS: 'LSE',
  HK: 'HKEX',
  HKG: 'HKEX',
  HKEX: 'HKEX',
  SG: 'SGX',
  SGX: 'SGX',
  KLS: 'KLSE',
  KLSE: 'KLSE',
  KL: 'KLSE',
  F: 'FRA',
  FRA: 'FRA',
  DE: 'FRA',
  ETR: 'FRA',
  SW: 'SIX',
  SIX: 'SIX',
  BR: 'BSE',
  BSE: 'BSE',
  BOM: 'BSE',
  BO: 'BSE',
  NSEI: 'NSE',
  NSEINDIA: 'NSE',
  NSEIND: 'NSE',
} as const;

type Exchange = keyof typeof mapExchange;

function decomposeSymbol(symbol: string): {
  ticker: string;
  exchange: Exchange;
} {
  const symbolMembers = symbol.toLocaleUpperCase().split('.');

  if (symbolMembers.length === 1) {
    const [ticker] = symbolMembers;

    return {
      ticker,
      exchange: 'TO',
    };
  }

  if (symbolMembers.length === 2) {
    const [ticker, exchange] = symbolMembers as [string, Exchange];

    return {
      ticker,
      exchange,
    };
  }

  if (symbolMembers.length === 3) {
    const [ticker, tickerSulfix, exchange] = symbolMembers as [
      string,
      string,
      Exchange
    ];

    return {
      ticker: [ticker, tickerSulfix].join('.'),
      exchange,
    };
  }

  throw new Error(`Invalid symbol: ${symbol}`);
}

function getUrl(symbol: string) {
  const { ticker, exchange } = decomposeSymbol(symbol);

  return `https://dividendhistory.org/payout/${mapExchange[
    exchange
  ]?.toLowerCase()}/${ticker}`;
}

async function loadDividendHistoryOrg(
  symbol: string
): Promise<cheerio.CheerioAPI> {
  const { data } = await axios.get<string>(getUrl(symbol));

  return cheerio.load(data);
}

export async function getDividendHistory(
  symbol: string
): Promise<DividendData> {
  const $ = await loadDividendHistoryOrg(symbol);

  const name = $(TICKER_NAME_SELECTOR)
    .text()
    .replace(/\(.+\)/g, '')
    .trim();

  const rawData = $(QUOTE_DATA_SELECTOR).text();
  const closePriceIndex = rawData.indexOf(CLOSE_PRICE_LABEL);
  const nextEarningsIndex = rawData.indexOf(NEXT_EARNINGS_LABEL);
  const yieldIndex = rawData.indexOf(YIELD_LABEL);
  const payoutIndex = rawData.indexOf(PAYOUT_LABEL);
  const peIndex = rawData.indexOf(PE_LABEL);
  const marketCapIndex = rawData.indexOf(MARKETCAP_LABEL);
  const frequencyIndex = rawData.indexOf(FREQUENCY_LABEL);
  const tableIndex = rawData.indexOf(TABLE_LABEL);

  const closePrice = rawData
    .slice(
      closePriceIndex + CLOSE_PRICE_LABEL.length,
      nextEarningsIndex > 0 ? nextEarningsIndex : yieldIndex
    )
    .trim();

  const divYieldPct = rawData
    .slice(yieldIndex + YIELD_LABEL.length, payoutIndex - 1)
    .trim();

  const peRatio = rawData
    .slice(peIndex + PE_LABEL.length, marketCapIndex)
    .trim();

  const frequency = rawData
    .slice(frequencyIndex + FREQUENCY_LABEL.length, tableIndex)
    .trim();

  const table = $(DIVIDEND_TABLE_SELECTOR)
    .text()
    .trim()
    .replace(/\t/g, '')
    .split('\n')
    .reduce((acc, curr, index) => {
      const rowIndex = Math.floor(index / COLUMN_COUNT);
      const columnIndex = index % COLUMN_COUNT;
      const columnKey = columnMap[columnIndex];

      if (!acc[rowIndex]) {
        acc[rowIndex] = {
          exDate: '',
          payDate: '',
          amount: 0,
          changePct: 0,
        } as DividendHistoryData;
      }

      if (curr == null || curr === 'unconfirmed/estimated') {
        return acc;
      }

      switch (columnKey) {
        case 'amount':
          acc[rowIndex].amount = Number(
            curr.replace('$', '').replace(/\*/g, '')
          );

          break;

        case 'changePct':
          acc[rowIndex].changePct = Number(curr.replace('%', ''));

          break;

        case 'exDate':
          acc[rowIndex].exDate = curr;

          break;

        case 'payDate':
          acc[rowIndex].payDate = curr;

          break;

        default:
          break;
      }

      return acc;
    }, [] as DividendHistoryData[]);

  return {
    quote: {
      symbol: symbol.toLocaleUpperCase(),
      name,
      closePrice,
      divYieldPct,
      frequency,
      peRatio,
    },
    history: table,
  };
}
