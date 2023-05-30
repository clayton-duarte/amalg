export interface ChartData {
  symbol: string;
  date: string;
  amount: number;
  type: string;
}

export function isChartData(data: unknown): data is ChartData[] {
  if (!Array.isArray(data)) return false;

  return data.every((d) => {
    if (typeof d !== 'object') return false;

    return 'amount' in d && 'date' in d && 'symbol' in d && 'type' in d;
  });
}
