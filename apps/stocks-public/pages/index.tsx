import Head from 'next/head';

import Grid from '@amalg/grid';
import Link, { NextLink } from '@amalg/link';
import Text from '@amalg/text';

// Custom
const LINKS = {
  DIVIDEND: [
    'ZDV.TO',
    'VDY.TO',
    'PDC.TO',
    'CDZ.TO',
    'HAL.TO',
    'XDV.TO',
    'XEI.TO',
    'XIU.TO',
  ],
  REIT: ['VRE.TO', 'ZRE.TO', 'XRE.TO', 'RIT.TO'],
  BANKS: ['ZWB.TO', 'ZEB.TO', 'CIC.TO', 'XFN.TO', 'CEW.TO'],
} as const;

// Generated
const SP500 = ['VFV.TO', 'ZSP.TO'];
const NASDAQ100 = ['XQQ.TO', 'ZQQ.TO'];
const TSX60 = ['XIU.TO', 'ZCN.TO'];
const BOND = ['VAB.TO', 'ZAG.TO'];
const GOLD = ['CGL.C.TO', 'CGL.TO'];
const CANADA = ['VCN.TO', 'ZCN.TO'];
const US = ['VUN.TO', 'ZSP.TO'];
const INTERNATIONAL = ['VIU.TO', 'ZEA.TO'];
const EMERGING = ['VEE.TO', 'ZEM.TO'];
const UTILITY = ['VPU.TO', 'ZUT.TO'];
const HEALTH = ['ZUH.TO', 'ZUH.TO'];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - Stocks Public</title>
      </Head>
      <Grid.Nav md="auto auto auto">
        <Link href="/">home</Link>
        <NextLink href="/vdy.to">quote example</NextLink>
        <NextLink href="/vfv.to/vdy.to">compare example</NextLink>
      </Grid.Nav>
      <Grid.Article>
        <Grid.Section>
          <Grid>
            <Text.H2>Thematic ETFs Comparison</Text.H2>
            <Grid.Ul>
              {Object.entries(LINKS).map(([key, value]) => (
                <Grid.Li key={key}>
                  <NextLink href={`/${value.join('/')}`}>{key}</NextLink>
                </Grid.Li>
              ))}
            </Grid.Ul>
          </Grid>
        </Grid.Section>
      </Grid.Article>
    </>
  );
}
