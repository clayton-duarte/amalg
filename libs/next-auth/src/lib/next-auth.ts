import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { GenericObject } from '@amalg/types';

import { requiredEnvVars } from '../utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: requiredEnvVars('GOOGLE_ID'),
      clientSecret: requiredEnvVars('GOOGLE_SECRET'),
    }),
  ],
};

export async function requireAuth<Props extends GenericObject>(
  ctx: GetServerSidePropsContext,
  props: Props
): Promise<ReturnType<GetServerSideProps<Props>>> {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session == null) {
    return {
      notFound: true,
    };
  }

  return {
    props,
  };
}

export function withAuth<Props extends GenericObject>(
  callback: GetServerSideProps<Props>
) {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (session == null) {
      ctx.res.statusCode = 401;

      return {
        notFound: true,
      };
    }

    return callback(ctx);
  };
}

export default function authHandler(options: Partial<AuthOptions> = {}) {
  return NextAuth({ ...authOptions, ...options });
}
