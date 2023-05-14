//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: { svgr: false },
  rewrites: async () => [
    {
      source: '/:path*',
      destination: `/:path*`,
    },
    {
      source: '/private',
      destination: `${process.env.STOCKS_PRIVATE_URL}`,
    },
    {
      source: '/private/:path*',
      destination: `${process.env.STOCKS_PRIVATE_URL}/:path*`,
    },
    {
      source: '/public',
      destination: `${process.env.STOCKS_PUBLIC_URL}`,
    },
    {
      source: '/public/:path*',
      destination: `${process.env.STOCKS_PUBLIC_URL}/:path*`,
    },
  ],
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
