import { NextLink } from '@amalg/link';
import { withParams } from '@amalg/page-decorators';

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
      <NextLink href="/quote/vdy.to">VDY.TO</NextLink>
    </>
  );
}
