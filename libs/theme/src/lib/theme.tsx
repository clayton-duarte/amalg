import { ThemeProvider as Provider, Global, Theme } from '@emotion/react';

export enum Breakpoints {
  XS = '0px',
  SM = '425px',
  MD = '768px',
  LG = '1024px',
  XL = '1280px',
}

export type BreakpointNames = keyof typeof Breakpoints;

export enum Colors {
  WHITE = '#cccccc',
  LIGHT = '#444444',
  DARK = '#202020',
  BLACK = '#181818',
  PRIMARY = '#ffcd56',
  SECONDARY = '#beae86',
  INFO = '#36a2eb',
  SUCCESS = '#4bc0c0',
  WARNING = '#9966ff',
  DANGER = '#ff6384',
}

export type ColorNames = keyof typeof Colors;

declare module '@emotion/react' {
  export interface Theme {
    WHITE: string;
    LIGHT: string;
    DARK: string;
    BLACK: string;
    PRIMARY: string;
    SECONDARY: string;
    INFO: string;
    SUCCESS: string;
    WARNING: string;
    DANGER: string;
  }

  export function useTheme(): Theme;
}

export const theme: Theme = Colors;

function GlobalStyles() {
  return (
    <Global
      styles={`
    html,
    body,
    #__next {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      background-color: ${theme.BLACK};
      color: ${theme.WHITE};
      font-size: 16px;
      height: 100%;
      padding: 0;
      margin: 0;
    }

    * {
      box-sizing: border-box;
    }

    p, h1, h2, h3, h4, h5, h6 {
      padding: 0;
      margin: 0;
    }
  `}
    />
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider theme={theme}>
      {children}
      <GlobalStyles />
    </Provider>
  );
}
