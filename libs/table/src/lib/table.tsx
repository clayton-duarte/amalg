import { ReactNode } from 'react';

import { formatCurrency, formatPercent } from '@amalg/financials';
import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export const StyledTable = styled.table`
  border: 1px solid ${(props) => props.theme.DARK};
  border-collapse: collapse;
  white-space: nowrap;
  width: 100%;
  margin: 0;
`;

export const StyledThead = styled.thead`
  border: 1px solid ${(props) => props.theme.DARK};
`;

export const StyledTbody = styled.tbody`
  border: 1px solid ${(props) => props.theme.DARK};
`;

export const StyledTr = styled.tr`
  border: 1px solid ${(props) => props.theme.DARK};
`;

export const StyledTh = styled.th<{ onClick?: () => void }>`
  ${(props) => (props.onClick != null ? 'cursor: pointer;' : '')}
  border: 1px solid ${(props) => props.theme.BLACK};
  background: ${(props) => props.theme.DARK};
  color: ${(props) => props.theme.SECONDARY};
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  text-align: left;
`;

export const StyledTd = styled.td<{ color?: ColorNames }>`
  color: ${(props) => (props.color ? props.theme[props.color] : 'inherit')};
  border: 1px solid ${(props) => props.theme.DARK};
  padding: 0.25rem 0.5rem;
  text-align: left;
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type TableData = { [key: string]: unknown };

function defaultFormatter(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 1);
}

const formatters = {
  currency: formatCurrency,
  percent: formatPercent,
} as const;

interface HeaderMetaData<T> {
  format?: keyof typeof formatters | ((value: T) => ReactNode);
  label: string;
}

export interface DataTableProps<D extends TableData> {
  headers: { [K in keyof D]?: HeaderMetaData<D[K]> | string };
  data: D[];
}

function parseHeaderMetadata<D extends TableData>(
  headersProp: DataTableProps<D>['headers']
): {
  [key in keyof D]?: {
    formatter: (...params: unknown[]) => string;
    label: string;
  };
} {
  return Object.entries(headersProp).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      return { ...acc, [key]: { label: value, formatter: defaultFormatter } };
    }

    const formatter =
      typeof value.format === 'function'
        ? value.format
        : typeof value.format === 'string'
        ? formatters[value.format]
        : defaultFormatter;

    return {
      ...acc,
      [key]: {
        label: value.label,
        formatter,
      },
    };
  }, {});
}

function RenderTable<D extends TableData>({
  headers,
  data,
}: Omit<DataTableProps<D>, 'scrollable'>) {
  const headerMetadata = parseHeaderMetadata(headers);
  const keys = Object.keys(headers);

  if (data.length === 1) {
    const row = data[0];

    return (
      <StyledTable>
        <StyledTbody>
          {keys.map((key, i) => {
            return (
              <StyledTr key={`table-row-${i}`}>
                <StyledTh>{headerMetadata[key].label}</StyledTh>
                <StyledTd>{headerMetadata[key].formatter(row[key])}</StyledTd>
              </StyledTr>
            );
          })}
        </StyledTbody>
      </StyledTable>
    );
  }

  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {keys.map((key) => (
            <StyledTh key={`table-header-${key}`}>
              {headerMetadata[key].label}
            </StyledTh>
          ))}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {data.map((row, i) => (
          <StyledTr key={`table-row-${i}`}>
            {keys.map((key, j) => {
              return (
                <StyledTd key={`table-cell-${key}-${j}`}>
                  {headerMetadata[key].formatter(row[key])}
                </StyledTd>
              );
            })}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
}

export default function DataTable<D extends TableData>({
  ...tableProps
}: DataTableProps<D>) {
  return (
    <ScrollWrapper>
      <RenderTable<D> {...tableProps} />
    </ScrollWrapper>
  );
}
