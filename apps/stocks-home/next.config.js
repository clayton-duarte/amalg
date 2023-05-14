//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => [
    {
      source: '/:path*',
      destination: `/:path*`,
    },
    {
      source: '/private',
      destination: 'http://localhost:3100/private',
    },
    {
      source: '/private/:path*',
      destination: 'http://localhost:3100/private/:path*',
    },
    {
      source: '/public',
      destination: 'http://localhost:3200/public',
    },
    {
      source: '/public/:path*',
      destination: 'http://localhost:3200/public/:path*',
    },
  ],
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
