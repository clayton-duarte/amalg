import { HTMLAttributes } from 'react';

import { Breakpoints, ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface StyledGridProps {
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
  minHeight?: string;
  maxHeight?: string;
  container?: boolean;
  area?: string;
}

export const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  margin: ${(props) => (props.m ? props.m : props.container ? '0 auto' : 0)};
  max-width: ${(props) => (props.container ? Breakpoints.XL : '100%')};
  max-height: ${(props) => props.maxHeight ?? 'max-content'};
  justify-self: ${(props) => props.justifySelf ?? 'start'};
  justify-content: ${(props) => props.justify ?? 'start'};
  grid-template-columns: ${(props) => props.xs ?? '1fr'};
  grid-template-rows: ${(props) => props.xsy ?? 'auto'};
  align-self: ${(props) => props.alignSelf ?? 'start'};
  align-items: ${(props) => props.align ?? 'start'};
  grid-area: ${(props) => props.area ?? 'auto'};
  gap: ${(props) => props.gap ?? '1rem'};
  padding: ${(props) => props.p ?? 0};
  width: 100%;
  min-height: ${(props) =>
    props.minHeight
      ? props.minHeight
      : props.xsy || props.mdy || props.lgy || props.xly
      ? '100%'
      : 'min-content'};
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

export type GridProps = StyledGridProps & HTMLAttributes<HTMLDivElement>;

function Grid({
  component = 'div',
  ...props
}: GridProps & {
  component?:
    | 'div'
    | 'section'
    | 'article'
    | 'main'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav'
    | 'form'
    | 'ul'
    | 'ol'
    | 'li';
}) {
  const Component = StyledGrid.withComponent(component);

  return <Component {...props} />;
}

Grid.Main = (props: GridProps) =>
  Grid({ component: 'main', xsy: 'auto', ...props });

Grid.Section = (props: GridProps) => Grid({ component: 'section', ...props });

Grid.Article = (props: GridProps) =>
  Grid({ component: 'article', p: '1.5rem', ...props });

Grid.Header = (props: GridProps) =>
  Grid({ component: 'header', p: '1rem 1.5rem', ...props });

Grid.Footer = (props: GridProps) =>
  Grid({ component: 'footer', p: '1rem 1.5rem', ...props });

Grid.Aside = (props: GridProps) => Grid({ component: 'aside', ...props });

Grid.Nav = (props: GridProps) =>
  Grid({ component: 'nav', p: '1rem 1.5rem', ...props });

Grid.Form = (props: GridProps) => Grid({ component: 'form', ...props });

Grid.Ul = (props: GridProps) =>
  Grid({ component: 'ul', p: '0 0 0 1rem', ...props });

Grid.Ol = (props: GridProps) =>
  Grid({ component: 'ol', p: '0 0 0 1rem', ...props });

Grid.Li = (props: GridProps) => Grid({ component: 'li', p: '1rem', ...props });

export default Grid;
