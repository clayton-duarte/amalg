import { withParams } from '@amalg/page-decorators';
import Table from '@amalg/table';

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface SymbolPageProps {
  symbol: string;
}

export const getStaticProps = withParams<SymbolPageProps, 'symbol'>(
  async (ctx) => {
    const { symbol } = ctx.params;

    return {
      props: {
        symbol,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  },
  'symbol'
);

export default function SymbolPage() {
  return (
    <>
      <Table
        data={[
          {
            test: 'asd',
            test2: 2,
            etc: { test: 'test' },
            a: 'a',
          },
        ]}
        headers={{
          test: 'Test',
          test2: 'Test 2',
          etc: 'Etc',
          a: 'A',
        }}
      />
    </>
  );
}
