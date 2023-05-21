import Big, { BigSource } from 'big.js';

import { ALMOST_ZERO, MONTHS_IN_YEAR, PERCENTAGE, ZERO } from './consts';

function isNumber(value: BigSource) {
  return !isNaN(Number(value));
}

function isZero(value: BigSource) {
  return isNumber(value) && new Big(value).eq(0);
}

function notZero(value: BigSource) {
  if (!isNumber(value) || isZero(value)) {
    return ALMOST_ZERO;
  }

  return value;
}

export interface ChartData {
  symbol: string;
  date: string;
  amount: number;
  type: string;
}

export const formatPercent = new Intl.NumberFormat('en-CA', {
  maximumFractionDigits: 2,
  style: 'percent',
}).format;

export const formatCurrency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

export function calcDividendDrip(divYieldPct: BigSource): Big {
  const yieldRatio = new Big(divYieldPct).div(PERCENTAGE);

  return new Big(1).div(notZero(yieldRatio)).times(MONTHS_IN_YEAR).round(0, 1);
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

export function mapValuesToPercent(arr: ChartData[], field: keyof ChartData) {
  const [first] = arr;

  return function (data: ChartData): ChartData {
    return {
      ...data,
      [field]: new Big(data[field] ?? ZERO)
        .div(notZero(first[field] ?? ZERO))
        .times(PERCENTAGE)
        .round(0, 1)
        .toNumber(),
    };
  };
}

export function mapChartDataToPercent(chartDataList: ChartData[]) {
  const [firstDividendData] = chartDataList;

  return chartDataList.map((dividendData) => ({
    ...dividendData,
    amount: new Big(dividendData.amount)
      .div(notZero(firstDividendData.amount))
      .minus(1)
      .toNumber(),
  }));
}

export function calcAccumulatedDividends(dividendDataList: ChartData[]) {
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
  dividendDataList: ChartData[],
  historyDataList: ChartData[]
) {
  const initialValue = historyDataList[0].amount;
  let totalCapital = new Big(initialValue);
  const data = [];

  for (const dividendData of dividendDataList) {
    const currentHistoryData = historyDataList.find(
      (historyData) => historyData.date === dividendData.date
    );

    const currentPrice = currentHistoryData?.amount ?? 0;
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

export function calcComposedDividendsPercent(
  dividendDataList: ChartData[],
  historyDataList: ChartData[]
) {
  const composedDividendDataList = calcComposedDividends(
    dividendDataList,
    historyDataList
  );

  return mapChartDataToPercent(composedDividendDataList);
}

export function calcCombinedCapitalAppreciation(
  dividendDataList: ChartData[],
  historyDataList: ChartData[]
): ChartData[] {
  const combinedData: ChartData[] = [];

  const composedDividendDataList = calcComposedDividends(
    dividendDataList,
    historyDataList
  );

  let latestDividendAmount = composedDividendDataList[0].amount;

  historyDataList.forEach((historyData) => {
    const currentDividendData = composedDividendDataList.find(
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
      amount: new Big(historyData.amount)
        .plus(currentDividendAmount)
        .div(2)
        .toNumber(),
    });
  });

  return combinedData;
}

export function calcCombinedCapitalAppreciationPercent(
  dividendDataList: ChartData[],
  historyDataList: ChartData[]
): ChartData[] {
  const combinedData = calcCombinedCapitalAppreciation(
    dividendDataList,
    historyDataList
  );

  return mapChartDataToPercent(combinedData);
}
