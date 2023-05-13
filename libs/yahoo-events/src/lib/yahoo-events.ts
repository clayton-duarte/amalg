import axios from 'axios';
import csv from 'csvtojson';
import dayjs from 'dayjs';

enum YahooEvents {
  history = 'history',
  div = 'div',
}

type YahooEventNames = keyof typeof YahooEvents;

const getYahooUrl = (symbol: string, events: YahooEventNames) => {
  const finalDate = dayjs().subtract(1, 'day').unix();
  const initialDate = dayjs().subtract(10, 'years').unix();

  const url = new URL(
    'https://query1.finance.yahoo.com/v7/finance/download/' + symbol
  );

  const searchParams = new URLSearchParams({
    period1: initialDate.toString(),
    period2: finalDate.toString(),
    includeAdjustedClose: 'true',
    interval: '1d',
    events,
  });

  url.search = searchParams.toString();

  return url.toString();
};

interface YahooHistory {
  Date: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  'Adj Close': string;
  Volume: string;
}

export interface HistoryData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}

interface YahooDividend {
  Date: string;
  Dividends: string;
}

export interface DividendData {
  date: string;
  dividends: number;
}

async function getYahooEvents(
  symbol: string,
  events: YahooEvents.history
): Promise<YahooHistory[]>;

async function getYahooEvents(
  symbol: string,
  events: YahooEvents.div
): Promise<YahooDividend[]>;

async function getYahooEvents(
  symbol: string,
  events: YahooEventNames
): Promise<YahooHistory[] | YahooDividend[]> {
  const url = getYahooUrl(symbol, events);
  const { data } = await axios.get<string>(url);

  return csv().fromString(data);
}

function mapYahooHistory(history: YahooHistory): HistoryData {
  return {
    date: dayjs(history.Date).format('YYYY-MM-DD'),
    open: parseFloat(history.Open),
    high: parseFloat(history.High),
    low: parseFloat(history.Low),
    close: parseFloat(history.Close),
    adjClose: parseFloat(history['Adj Close']),
    volume: parseInt(history.Volume),
  };
}

function mapYahooDividend(dividend: YahooDividend): DividendData {
  return {
    date: dayjs(dividend.Date).format('YYYY-MM-DD'),
    dividends: parseFloat(dividend.Dividends),
  };
}

export async function getYahooHistory(symbol: string): Promise<HistoryData[]> {
  const csvData = await getYahooEvents(symbol, YahooEvents.history);

  return csvData.map(mapYahooHistory);
}

export async function getYahooDividends(symbol: string) {
  const csvData = await getYahooEvents(symbol, YahooEvents.div);

  return csvData.map(mapYahooDividend);
}
