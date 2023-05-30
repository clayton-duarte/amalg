import Big from 'big.js';

import { calcCombinedCapitalAppreciationPercent } from './calc';
import { PERCENTAGE, ZERO } from './consts';
import { ChartData } from './type';
import { notZero } from './utils';

export function flattenChartData(...data: ChartData[][]): ChartData[] {
  return data.flat().sort((a, b) => a.date.localeCompare(b.date));
}

export function mapValuesToPercent(arr: ChartData[], field: keyof ChartData) {
  const [first] = arr;

  return function (data: ChartData): ChartData {
    return {
      ...data,
      [field]: new Big(data[field] ?? ZERO)
        .div(notZero(first[field]))
        .times(PERCENTAGE)
        .round(0, 1)
        .toNumber(),
    };
  };
}

export function mapChartDataToPercent(chartDataList: ChartData[]) {
  const [firstData] = chartDataList;

  return chartDataList.map((chartData) => ({
    ...chartData,
    amount: new Big(chartData.amount)
      .div(notZero(firstData.amount))
      .minus(1)
      .toNumber(),
  }));
}

export function flattenChartDataPercent(...data: ChartData[][]): ChartData[] {
  return data
    .map(mapChartDataToPercent)
    .flat()
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function mapCalcCombinedCapitalAppreciationPercent(
  dividendDataList: ChartData[][],
  historyDataList: ChartData[][]
) {
  return function (_: unknown, index: number): ChartData[] {
    return calcCombinedCapitalAppreciationPercent(
      dividendDataList[index],
      historyDataList[index]
    );
  };
}
