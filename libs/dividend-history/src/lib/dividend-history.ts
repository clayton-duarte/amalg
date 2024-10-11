import axios from 'axios';
import Big from 'big.js';
import * as cheerio from 'cheerio';

import { validNumberOrZero } from '@amalg/financials';

const DIVIDEND_TABLE_SELECTOR = '#dividend_table > tbody';
const TICKER_NAME_SELECTOR = 'h4:nth-child(1)';
const QUOTE_DATA_SELECTOR = '.col-md-8 > p';

export type QuoteData = {
  symbol: string;
  name: string;
  closePrice: number;
  divYieldPct: number;
  peRatio: number;
  frequency: string;
};

export interface DividendData {
  symbol: string;
  changePct: number;
  payDate: string;
  exDate: string;
  amount: number;
}

export interface DividendHistoryData {
  quote: QuoteData;
  dividends: DividendData[];
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
  exchange?: Exchange;
} {
  const symbolMembers = symbol.toLocaleUpperCase().split('.');

  if (symbolMembers.length === 1) {
    const [ticker] = symbolMembers;

    return {
      ticker,
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
  const exchangeCode = mapExchange[exchange];

  if (!exchangeCode) return `https://dividendhistory.org/payout/${ticker}`;

  return `https://dividendhistory.org/payout/${exchangeCode?.toLowerCase()}/${ticker}`;
}

async function loadDividendHistoryOrg(
  symbol: string
): Promise<cheerio.CheerioAPI> {
  const { data } = await axios.get<string>(getUrl(symbol));

  return cheerio.load(data);
}

const parseNumber = (value: string) => {
  const parsed = parseFloat(value.replace(/[^0-9.-]+/g, ''));

  return isNaN(parsed) ? null : parsed;
};

export async function getDividendHistory(
  symbol: string
): Promise<DividendHistoryData> {
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
  const parsedSymbol = symbol.toLocaleUpperCase();

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

  const table = [];

  $(DIVIDEND_TABLE_SELECTOR)
    .children()
    .each((rowIndex, rowEl) => {
      const row = $(rowEl);

      const rowData = {
        symbol: parsedSymbol,
        exDate: '',
        payDate: '',
        amount: 0,
        changePct: 0,
      } as DividendData;

      row.children('td').each((cellIndex, cellEl) => {
        const cellText = $(cellEl).text();

        switch (cellIndex) {
          case 0:
            rowData.exDate = cellText;

            break;

          case 1:
            rowData.payDate = cellText;

            break;

          case 2:
            rowData.amount = parseNumber(cellText.replace('$', ''));

            break;

          case 3:
            rowData.changePct = parseNumber(cellText.replace('%', ''));

            break;

          default:
            break;
        }
      });

      table[rowIndex] = rowData;
    });

  return {
    quote: {
      name,
      symbol: parsedSymbol,
      closePrice: new Big(validNumberOrZero(closePrice)).toNumber(),
      divYieldPct: new Big(validNumberOrZero(divYieldPct)).div(100).toNumber(),
      peRatio: new Big(validNumberOrZero(peRatio)).toNumber(),
      frequency,
    },
    dividends: table,
  };
}

export function getQuote(symbol: string): Promise<QuoteData> {
  return getDividendHistory(symbol).then(({ quote }) => quote);
}
