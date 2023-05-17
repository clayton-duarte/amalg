import styled from '@emotion/styled';

export interface ChartProps {
  color: string;
}

export default styled.p<ChartProps>`
  color: ${(props) => props.color};
`;
