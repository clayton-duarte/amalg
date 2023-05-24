import Big from 'big.js';
import { useMemo } from 'react';

import { ChartData, formatCurrency } from '@amalg/financials';
import Grid from '@amalg/grid';
import Text from '@amalg/text';
import { size } from '@amalg/theme';
import styled from '@emotion/styled';

export interface PriceFluctuationProps {
  historyData: ChartData[];
}

function getLatestValue(data: ChartData[]) {
  return data[data.length - 1].amount;
}

function getLast12Months(data: ChartData[]) {
  return data.slice(-12);
}

function getMinMaxValues(data: ChartData[]) {
  const values = data.map((d) => d.amount);

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

const StyledBar = styled(Grid)<{ percent: string | number }>`
  height: ${size(1 / 8)};
  bottom: 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.SUCCESS} 0%,
    ${({ theme }) => theme.SUCCESS} ${({ percent }) => percent}%,
    ${({ theme }) => theme.DANGER} ${({ percent }) => percent}%,
    ${({ theme }) => theme.DANGER} 100%
  );
  &::after {
    background: ${({ theme }) => theme.WHITE};
    left: ${({ percent }) => percent}%;
    transform: translateX(-50%);
    bottom: ${size(-1 / 16)};
    height: ${size(1 / 4)};
    width: ${size(1 / 4)};
    position: absolute;
    border-radius: 50%;
    content: '';
  }
`;

const StyledText = styled(Text.Strong)<{ percent: string | number }>`
  transform: translateX(-50%) translateY(-50%);
  background: ${({ theme }) => theme.WHITE};
  padding: ${size(1 / 8)} ${size(1 / 4)};
  color: ${({ theme }) => theme.BLACK};
  left: ${({ percent }) => percent}%;
  position: absolute;
  font-weight: bold;
  font-size: 0.5rem;
  z-index: 99;
`;

export default function PriceFluctuation({
  historyData,
}: PriceFluctuationProps) {
  const { suggestion, percent, min, max } = useMemo(() => {
    const last12months = getLast12Months(historyData);
    const { min, max } = getMinMaxValues(last12months);
    const latestValue = getLatestValue(last12months);
    const diff = new Big(max).minus(min);

    const percent = new Big(latestValue)
      .minus(min)
      .div(diff)
      .times(100)
      .toNumber();

    const suggestion = percent > 60 ? 'SELL' : percent < 40 ? 'BUY' : 'HOLD';

    return { suggestion, percent, min, max };
  }, [historyData]);

  return (
    <Grid xs="auto 1fr auto" align="center">
      <Text.Strong small>{formatCurrency(min)}</Text.Strong>
      <StyledBar percent={percent}>
        <StyledText small percent={percent}>
          {suggestion}
        </StyledText>
      </StyledBar>
      <Text.Strong small>{formatCurrency(max)}</Text.Strong>
    </Grid>
  );
}
