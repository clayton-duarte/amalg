import Big, { BigSource } from 'big.js';

import { ChartData, Dataset } from '@amalg/chart';
import { HistoryData, DividendData } from '@amalg/yahoo-events';

import { ALMOST_ZERO, MONTHS_IN_YEAR, PERCENTAGE } from './consts';

function isNumber(value: BigSource) {
  return !isNaN(Number(value));
}

function notZero(value: BigSource) {
  if (!isNumber(value) || new Big(value).eq(0)) {
    return ALMOST_ZERO;
  }

  return value;
}

export function calcDividendDrip(divYieldPct: BigSource): Big {
  const formattedDividend = new Big(divYieldPct).div(PERCENTAGE);

  return new Big(1).div(formattedDividend).times(MONTHS_IN_YEAR).round(0, 1);
}

export function calcCompoundInterest({
  ratePerPeriodPct,
  numberOfPeriods,
  initialValue,
}: {
  ratePerPeriodPct: BigSource;
  numberOfPeriods: number;
  initialValue: BigSource;
}) {
  const onePlusRate = new Big(1).plus(ratePerPeriodPct);
  const compoundInterest = new Big(onePlusRate).pow(numberOfPeriods);

  return new Big(initialValue).times(compoundInterest);
}

export function calcTotalGrowth(data: BigSource[]) {
  const last = data[data.length - 1];
  const [first] = data;

  return new Big(last).minus(first);
}

export function calcAnnualizedGrowth(data: BigSource[]) {
  const [first] = data;
  const growthPct = calcTotalGrowth(data).div(notZero(first)).times(PERCENTAGE);

  return growthPct.div(notZero(data.length)).times(MONTHS_IN_YEAR);
}

export function mapValuesToPercent(arr: Dataset[], field: keyof Dataset) {
  const [first] = arr;

  return function (data: Dataset): Dataset {
    return {
      ...data,
      [field]: new Big(data[field])
        .div(notZero(first[field]))
        .times(PERCENTAGE)
        .round(0, 1)
        .toNumber(),
    };
  };
}

export function combinePriceAndDividendHistory(
  priceHistory: HistoryData[],
  dividendHistory: DividendData[],
  drip = 1
): Dataset[] {
  const mappedPriceHistory = priceHistory.reduce((acc, price) => {
    acc[price.date] = price.close * drip;

    return acc;
  }, {} as { [key: string]: number });

  const mappedDividendHistory = dividendHistory.reduce((acc, dividend) => {
    acc[dividend.date] = dividend.amount * drip;

    return acc;
  }, {} as { [key: string]: number });

  // const reinvestedDividend = Object.entries(mappedPriceHistory).reduce(
  //   (acc, [date, amount], i) => {
  //     const currentDividend = new Big(mappedDividendHistory[date] || 0);
  //     const currentPrice = new Big(amount);
  //     const dripped = drip % i === 0;

  //     console.log({ currentDividend, currentPrice, drip, i, dripped });

  //     acc[date] = amount;

  //     return acc;
  //   },
  //   {} as { [key: string]: number }
  // );

  return Object.entries(mappedPriceHistory).map(([date, value]) => {
    return {
      seriesField: priceHistory[0].symbol,
      yAxis: new Big(value).plus(mappedDividendHistory[date] || 0).toNumber(),
      xAxis: date,
    };
  });
}

export function combinePriceAndDividendHistoryPercent(
  priceHistory: HistoryData[],
  dividendHistory: DividendData[]
): Dataset[] {
  const combined = combinePriceAndDividendHistory(
    priceHistory,
    dividendHistory
  );

  return combined.map(mapValuesToPercent(combined, 'yAxis'));
}

export function mapDividendDataToProportional(
  dividendDataList: DividendData[]
) {
  const [firstDividendData] = dividendDataList;

  return dividendDataList.map((dividendData) => ({
    ...dividendData,
    amount: new Big(dividendData.amount)
      .div(notZero(firstDividendData.amount))
      .toNumber(),
  }));
}

export function calcAccumulatedDividends(dividendDataList: DividendData[]) {
  let accumulatedDividends = new Big(0);
  const newDividendDataList = [];

  for (const dividendData of dividendDataList) {
    accumulatedDividends = accumulatedDividends.plus(dividendData.amount);

    newDividendDataList.push({
      ...dividendData,
      amount: new Big(accumulatedDividends).toNumber(),
    });
  }

  return newDividendDataList;
}

export function calcComposedDividends(
  dividendDataList: DividendData[],
  historyDataList: HistoryData[]
) {
  const initialValue = historyDataList[0].close;
  let totalCapital = new Big(initialValue);
  const data = [];

  for (const dividendData of dividendDataList) {
    const currentHistoryData = historyDataList.find(
      (historyData) => historyData.date === dividendData.date
    );

    const currentPrice = currentHistoryData?.close ?? 0;
    const currentShares = new Big(totalCapital).div(currentPrice);
    const currentValueReinvested = currentShares.times(dividendData.amount);

    totalCapital = totalCapital.plus(currentValueReinvested);

    data.push({
      ...dividendData,
      amount: totalCapital.toNumber(),
    });
  }

  return data;
}

export function calcCombinedCapitalAppreciation(
  dividendDataList: DividendData[],
  historyDataList: HistoryData[]
): ChartData[] {
  const combinedData: ChartData[] = [];
  let latestDividendAmount = dividendDataList[0].amount;

  historyDataList.forEach((historyData) => {
    const currentDividendData = dividendDataList.find(
      (dividendData) => dividendData.date === historyData.date
    );

    let currentDividendAmount = 0;

    if (currentDividendData != null) {
      latestDividendAmount = currentDividendData.amount;

      currentDividendAmount = currentDividendData.amount;
    } else {
      currentDividendAmount = latestDividendAmount;
    }

    combinedData.push({
      type: 'dividend',
      date: historyData.date,
      symbol: historyData.symbol,
      amount: new Big(historyData.close).plus(currentDividendAmount).toNumber(),
    });
  });

  return combinedData;
}
