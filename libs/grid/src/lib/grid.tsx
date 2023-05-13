import { Breakpoints, ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface StyledTextProps {
  bg?: ColorNames;
  justify?: string;
  justifySelf?: string;
  align?: string;
  alignSelf?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xsy?: string;
  smy?: string;
  mdy?: string;
  lgy?: string;
  xly?: string;
  gap?: string;
  m?: string;
  p?: string;
  height?: string;
  maxHeight?: string;
  container?: boolean;
  area?: string;
}

export default styled.div<StyledTextProps>`
  display: grid;
  margin: ${(props) => (props.m ? props.m : props.container ? '0 auto' : 0)};
  max-width: ${(props) => (props.container ? Breakpoints.XL : '100%')};
  justify-content: ${(props) => props.justify ?? 'start'};
  justify-self: ${(props) => props.justifySelf ?? 'start'};
  grid-template-columns: ${(props) => props.xs ?? '1fr'};
  grid-template-rows: ${(props) => props.xsy ?? 'auto'};
  max-height: ${(props) => props.maxHeight ?? 'auto'};
  align-items: ${(props) => props.align ?? 'start'};
  align-self: ${(props) => props.alignSelf ?? 'start'};
  grid-area: ${(props) => props.area ?? 'auto'};
  height: ${(props) => props.height ?? 'auto'};
  gap: ${(props) => props.gap ?? '1rem'};
  padding: ${(props) => props.p ?? 0};
  width: 100%;
  min-height: ${(props) =>
    props.xsy || props.mdy || props.lgy || props.xly ? '100%' : 'auto'};
  background: ${(props) => (props.bg ? props.theme[props.bg] : 'transparent')};
  // Responsive
  @media (min-width: ${Breakpoints.SM}) {
    grid-template-columns: ${(props) => props.sm ?? props.xs ?? '1fr'};
    grid-template-rows: ${(props) => props.smy ?? props.xsy ?? 'auto'};
  }
  @media (min-width: ${Breakpoints.MD}) {
    grid-template-columns: ${(props) =>
      props.md ?? props.sm ?? props.xs ?? '1fr'};
    grid-template-rows: ${(props) =>
      props.mdy ?? props.smy ?? props.xsy ?? 'auto'};
  }
  @media (min-width: ${Breakpoints.LG}) {
    grid-template-columns: ${(props) =>
      props.lg ?? props.md ?? props.sm ?? props.xs ?? '1fr'};
    grid-template-rows: ${(props) =>
      props.lgy ?? props.mdy ?? props.smy ?? props.xsy ?? 'auto'};
  }
  @media (min-width: ${Breakpoints.XL}) {
    grid-template-columns: ${(props) =>
      props.xl ?? props.lg ?? props.md ?? props.sm ?? props.xs ?? '1fr'};
    grid-template-rows: ${(props) =>
      props.xly ?? props.lgy ?? props.mdy ?? props.smy ?? props.xsy ?? 'auto'};
  }
`;
