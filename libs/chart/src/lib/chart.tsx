import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Grid from '@amalg/grid';
import Text from '@amalg/text';
import { ColorNames, Colors } from '@amalg/theme';

type GenericData = { [key: string]: any };

export interface ChartData {
  symbol: string;
  type: string;
  date: string;
  amount: number;
}

export type Dataset = {
  seriesField?: string;
  xAxis: string;
  yAxis: number;
};

enum PlotTypes {
  line = 'Line',
  area = 'Area',
  column = 'Column',
  bar = 'Bar',
  pie = 'Pie',
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
  title?: string;
}

// https://charts.ant.design/en/api/plots/line;
export default function Chart<D extends GenericData = GenericData>({
  type = 'line',
  seriesField,
  reversed,
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
        renderer="svg"
        color={
          color
            ? Colors[color]
            : [
                Colors.PRIMARY,
                Colors.INFO,
                Colors.SUCCESS,
                Colors.DANGER,
                Colors.WARNING,
                Colors.WHITE,
                Colors.SECONDARY,
              ]
        }
      />
    </Grid>
  );
}
