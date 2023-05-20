import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Grid from '@amalg/grid';
import Text from '@amalg/text';
import { ColorNames, Colors } from '@amalg/theme';

// https://charts.ant.design/en/api/plots/line;

const Line = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Line),
  { loading: () => <Text>Loading...</Text>, ssr: false }
);

type ChartData = { [key: string]: any };

export interface ChartProps<D extends ChartData = ChartData> {
  data: D[];
  yAxis: keyof D;
  xAxis: keyof D;
  seriesField?: keyof D;
  reversed?: boolean;
  color?: ColorNames;
  title?: string;
}

export default function Chart<D extends ChartData = ChartData>({
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

    if (reversed) {
      return [...data].reverse();
    }

    return data;
  }, [reversed, data]);

  if (parsedData == null) return null;

  return (
    <Grid bg="DARK" p="1rem">
      {title && <Text.H3>{title}</Text.H3>}
      <Line
        data={parsedData}
        seriesField={seriesField && String(seriesField)}
        yField={String(yAxis)}
        xField={String(xAxis)}
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
