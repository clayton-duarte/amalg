import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';

import { formatCurrency, formatPercent } from '@amalg/financials';
import Grid from '@amalg/grid';
import Modal from '@amalg/modal';
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
  format?: keyof typeof formatters;
  seriesField?: keyof D;
  type?: PlotTypeNames;
  reversed?: boolean;
  color?: ColorNames;
  isStack?: boolean;
  title?: string;
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
  const [open, setOpen] = useState(false);

  const parsedData = useMemo(() => {
    if (data.length < 1) return null;

    return reversed ? [...data].reverse() : [...data];
  }, [data, reversed]);

  const renderedChart = useMemo(() => {
    if (parsedData == null) return null;

    const ChartComponent = AsyncPlot(type);

    return (
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
    );
  }, [color, format, isStack, parsedData, seriesField, type, xAxis, yAxis]);

  return (
    <Grid bg="DARK" p="1rem">
      <Grid xs="1fr auto" align="center">
        {title ? <Text.H3>{title}</Text.H3> : <span />}
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
