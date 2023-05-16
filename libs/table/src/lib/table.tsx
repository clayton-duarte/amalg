import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid ${(props) => props.theme.DARK};
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
  position: sticky;
  text-align: left;
  left: 0;
  top: 0;
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

type TableData = { [key: string]: any };

export interface DataTableProps<D extends TableData> {
  data: D[];
  headers: { [key in keyof D]?: string };
  scrollable?: boolean;
}

function RenderTable<D extends TableData>({
  headers,
  data,
}: Omit<DataTableProps<D>, 'scrollable'>) {
  const keys = Object.keys(headers);

  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {keys.map((key) => (
            <StyledTh key={`table-header-${key}`}>{headers[key]}</StyledTh>
          ))}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {data.map((row, i) => (
          <StyledTr key={`table-row-${i}`}>
            {keys.map((key, j) => {
              const contents = row[key];

              const parsedContents =
                typeof contents !== 'string'
                  ? JSON.stringify(contents, null, 1)
                  : contents;

              return (
                <StyledTd key={`table-cell-${key}-${j}`}>
                  {parsedContents}
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
  scrollable,
  ...tableProps
}: DataTableProps<D>) {
  if (scrollable) {
    return (
      <ScrollWrapper>
        <RenderTable<D> {...tableProps} />
      </ScrollWrapper>
    );
  }

  return <RenderTable<D> {...tableProps} />;
}
