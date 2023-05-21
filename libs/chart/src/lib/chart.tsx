import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { formatCurrency, formatPercent } from '@amalg/financials';
import Grid from '@amalg/grid';
import Text from '@amalg/text';
import { ColorNames, Colors } from '@amalg/theme';

type GenericData = { [key: string]: any };

enum PlotTypes {
  line = 'Line',
  area = 'Area',
  // etc.
}

type PlotTypeNames = keyof typeof PlotTypes;

const AsyncPlot = (type: PlotTypeNames) =>
  dynamic(
    () => import('@ant-design/plots').then((mod) => mod[PlotTypes[type]]),
    { loading: () => <Text>Loading...</Text>, ssr: false }
  );

export interface ChartProps<D extends GenericData = GenericData> {
  data: D[];
  yAxis: keyof D;
  xAxis: keyof D;
  seriesField?: keyof D;
  type?: PlotTypeNames;
  reversed?: boolean;
  color?: ColorNames;
  isStack?: boolean;
  title?: string;
  format?: keyof typeof formatters;
}

const chartColorArray = [
  Colors.PRIMARY,
  Colors.INFO,
  Colors.SUCCESS,
  Colors.DANGER,
  Colors.WARNING,
  Colors.WHITE,
  Colors.SECONDARY,
];

const formatters = {
  currency: formatCurrency,
  percent: formatPercent,
};

// https://charts.ant.design/en/api/plots/line;
export default function Chart<D extends GenericData = GenericData>({
  type = 'line',
  seriesField,
  reversed,
  isStack,
  format,
  color,
  title,
  yAxis,
  xAxis,
  data,
}: ChartProps<D>) {
  const parsedData = useMemo(() => {
    if (data.length < 1) return null;

    return reversed ? [...data].reverse() : [...data];
  }, [data, reversed]);

  if (parsedData == null) return null;

  const ChartComponent = AsyncPlot(type);

  return (
    <Grid bg="DARK" p="1rem">
      {title && <Text.H3>{title}</Text.H3>}
      <ChartComponent
        data={parsedData}
        seriesField={seriesField && String(seriesField)}
        xField={String(xAxis)}
        yField={String(yAxis)}
        isStack={isStack}
        height={250}
        width={100}
        autoFit
        meta={{
          [String(yAxis)]: {
            formatter: format && formatters[format],
          },
        }}
        yAxis={{
          nice: true,
          min: 100,
        }}
        color={
          color
            ? Colors[color]
            : seriesField == null
            ? Colors.PRIMARY
            : chartColorArray
        }
      />
    </Grid>
  );
}
