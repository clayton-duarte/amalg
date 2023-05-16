import { GetServerSidePropsContext } from 'next';

import { ReType, TupleUnion } from '@amalg/types';

type GetServerSidePropsWithParams<Q extends string> = ReType<
  GetServerSidePropsContext,
  'params',
  { [key in Q]: string }
>;

/**
 * @description
 * A decorator that ensures that the required route parameters are present
 * before calling the getServerSideProps function
 * @param getServerSidePropsWithParams The getServerSideProps function that will be called
 * @param params The required route parameters
 * @returns
 * A function that will call the getServerSideProps function if the required route
 * parameters are present
 * @example
 * ```ts
 * import { withParams } from '@amalg/page-decorators';
 *
 * export const getServerSideProps = withParams(
 *  async (ctx) => {
 *    return {
 *     props: {
 *     id: ctx.params.id,
 *    },
 *   };
 *  },
 *  'id'
 * );
 * ```
 */
export function withParams<
  // This is the type of the props returned by the getServerSideProps function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends { [key: string]: any },
  Q extends string = string
>(
  getServerSidePropsWithParams: (
    ctx: GetServerSidePropsWithParams<Q>
  ) => Promise<{ props: P }>,
  ...params: TupleUnion<Q>
) {
  return function (ctx: GetServerSidePropsWithParams<Q>) {
    if (ctx.params == null) {
      throw new Error('Missing params');
    }

    for (const param of params) {
      if (ctx.params[param as Q] === undefined) {
        throw new Error(`Missing required route parameter: ${param as string}`);
      }
    }

    return getServerSidePropsWithParams(ctx);
  };
}
