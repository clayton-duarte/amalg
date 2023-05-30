import Big from 'big.js';

import { formatCurrency, formatPercent } from '@amalg/financials';
import { ColorNames, Colors } from '@amalg/theme';

export const formatters = {
  currency: formatCurrency,
  percent: formatPercent,
};

export const chartColorArray = [
  Colors.PRIMARY,
  Colors.INFO,
  Colors.SUCCESS,
  Colors.DANGER,
  Colors.WARNING,
  Colors.WHITE,
];

export function getSemanticColor(growth: Big): ColorNames {
  if (growth.eq(0)) return 'PRIMARY';

  if (growth.gt(0)) return 'SUCCESS';

  return 'DANGER';
}

export function getChartColor(
  color?: ColorNames | ColorNames[],
  seriesField?: unknown,
  growth?: Big | null
) {
  if (Array.isArray(color)) return color.map((c) => Colors[c]);

  if (typeof color === 'string') return Colors[color];

  if (seriesField == null)
    return Colors[getSemanticColor(growth ?? new Big(0))];

  return chartColorArray;
}
