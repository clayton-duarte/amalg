import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Grid from '@amalg/grid';
import Text from '@amalg/text';
import { ColorNames, Colors } from '@amalg/theme';

const Line = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Line),
  { loading: () => <Text>Loading...</Text>, ssr: false }
);

type ChartData = { [key: string]: any };

export interface ChartProps<D extends ChartData = ChartData> {
  data: D[];
  yAxis: keyof D;
  xAxis: keyof D;
  reversed?: boolean;
  title?: string;
  color?: ColorNames;
}

export default function Chart<D extends ChartData = ChartData>({
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
    <Grid minHeight="100%" bg="DARK" p="1rem">
      {title && <Text.H3>{title}</Text.H3>}
      <Grid minHeight="100%">
        {/* https://charts.ant.design/en/api/plots/line */}
        <Line
          data={parsedData}
          color={Colors[color || 'PRIMARY']}
          yField={String(yAxis)}
          xField={String(xAxis)}
          yAxis={{ min: 100 }}
          renderer="svg"
        />
      </Grid>
    </Grid>
  );
}
