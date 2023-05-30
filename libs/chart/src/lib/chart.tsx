import Big from 'big.js';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';

import { formatPercent, isChartData, calcGrowth } from '@amalg/financials';
import Grid from '@amalg/grid';
import Modal from '@amalg/modal';
import Text from '@amalg/text';
import { ColorNames } from '@amalg/theme';

import { getChartColor, getSemanticColor, formatters } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  color?: ColorNames | ColorNames[];
  format?: keyof typeof formatters;
  seriesField?: keyof D;
  type?: PlotTypeNames;
  reversed?: boolean;
  heigth?: number;
  title?: string;
}

// https://charts.ant.design/en/api/plots/line;
export default function Chart<D extends GenericData = GenericData>({
  type = 'line',
  heigth = 300,
  seriesField,
  reversed,
  format,
  color,
  title,
  yAxis,
  xAxis,
  data,
}: ChartProps<D>) {
  const [open, setOpen] = useState(false);

  const parsedData = useMemo(() => {
    if (data.length < 1) return null;

    return reversed ? [...data].reverse() : [...data];
  }, [data, reversed]);

  const { min, max } = useMemo(() => {
    if (parsedData == null) return { min: 0, max: 0 };

    const values = parsedData.map((d) => new Big(d[yAxis]).toNumber());
    const max = new Big(Math.max(...values)).times(1.1).toNumber();
    const min = new Big(Math.min(...values)).times(0.9).toNumber();

    return { min, max };
  }, [parsedData, yAxis]);

  const growth = useMemo(() => {
    if (seriesField != null || !isChartData(data)) return null;

    return calcGrowth(data);
  }, [seriesField, data]);

  const renderedChart = useMemo(() => {
    if (parsedData == null) return null;

    const ChartComponent = AsyncPlot(type);
    const seriesFieldString = String(seriesField);

    return (
      <ChartComponent
        data={parsedData}
        seriesField={seriesField && seriesFieldString}
        xField={String(xAxis)}
        yField={String(yAxis)}
        height={heigth}
        width={100}
        autoFit
        meta={{
          [String(yAxis)]: {
            formatter: format && formatters[format],
          },
        }}
        yAxis={{
          nice: true,
          max,
          min,
        }}
        color={getChartColor(color, seriesField, growth)}
      />
    );
  }, [
    parsedData,
    type,
    seriesField,
    xAxis,
    yAxis,
    heigth,
    format,
    max,
    min,
    color,
    growth,
  ]);

  return (
    <Grid bg="DARK" p="1rem">
      <Grid xs="1fr auto auto" align="center">
        {title ? <Text.H3>{title}</Text.H3> : <span />}
        {growth ? (
          <Text bold small color={getSemanticColor(growth)}>
            {formatPercent(growth.toNumber())}
          </Text>
        ) : (
          <span />
        )}
        <AiOutlineExpandAlt
          onClick={() => setOpen(true)}
          fontSize="1.5rem"
          role="button"
        />
      </Grid>
      {renderedChart}
      <Modal
        onClose={() => setOpen(false)}
        title={title}
        open={open}
        fullScreen
      >
        {renderedChart}
      </Modal>
    </Grid>
  );
}
