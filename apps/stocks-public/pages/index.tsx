import Head from 'next/head';

import Grid from '@amalg/grid';
import Link, { NextLink } from '@amalg/link';
import Text from '@amalg/text';

// Custom
const INDEX = {
  'NASDAQ 100': [
    'XQQ.TO',
    'TLF.TO',
    'ZQQ.TO',
    'XIT.TO',
    'TEC.TO',
    'HXQ.TO',
    'ZNQ.TO',
  ],
  'S&P 500': [
    'VFV.TO',
    'ZSP.TO',
    'XUS.TO',
    'VSP.TO',
    'HXS.TO',
    'XSP.TO',
    'XUU.TO',
  ],
  'TSX 60': [
    'TTP.TO',
    'XIU.TO',
    'ZCN.TO',
    'HXT.TO',
    'XIC.TO',
    'VCE.TO',
    'ETSX.TO',
    'VCN.TO',
  ],
} as const;

const SECTOR = {
  DIVIDEND: [
    'ZDV.TO',
    'ZMI.TO',
    'VDY.TO',
    'PDC.TO',
    'CDZ.TO',
    'HAL.TO',
    'XDV.TO',
    'XEI.TO',
    'XIU.TO',
  ],
  BANKS: [
    'ZWB.TO',
    'ZEB.TO',
    'CIC.TO',
    'XFN.TO',
    'CEW.TO',
    'ZBK.TO',
    'XFN.TO',
    'HCA.TO',
  ],
  REIT: ['VRE.TO', 'ZRE.TO', 'XRE.TO', 'RIT.TO', 'MREL.TO'],
  HEALTHCARE: ['LIFE.TO', 'HHL.TO', 'ZUH.TO', 'XHC.TO', 'TDOC.TO'],
  UTILITIES: ['ZUT.TO', 'XUT.TO', 'ZUT.TO', 'XEG.TO', 'HUTL.TO', 'HUTS.TO'],
  'LOW VOLATILITY': ['ZLB.TO', 'ZLI.TO', 'ZLU.TO'],
};

const ETC = {
  'ALL-IN-ONE': [
    'VGRO.TO',
    'VBAL.TO',
    'VCNS.TO',
    'XGRO.TO',
    'XBAL.TO',
    'XCNS.TO',
    'ZGRO.TO',
    'ZBAL.TO',
    'ZCON.TO',
  ],
  'ALL EQUITY': ['VEQT.TO', 'XEQT.TO', 'ZEQT.TO'],
  PREFERRED: ['ZPR.TO', 'CPD.TO', 'HPR.TO', 'ZHP.TO'],
  EMERGING: ['VEE.TO', 'ZEM.TO', 'XAW.TO', 'VIU.TO', 'VI.TO'],
  BONDS: ['XHB.TO', 'ZAG.TO', 'VSC.TO', 'VAB.TO', 'VSB.TO', 'XBB.TO', 'XQB.TO'],
  ETC: ['VGG.TO', 'VUN.TO', 'VUS.TO'],
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - Stocks Public</title>
      </Head>
      <Grid.Nav md="auto auto auto">
        <Link href="/">HOME</Link>
      </Grid.Nav>
      <Grid.Article>
        <Grid.Section md="1fr 1fr 1fr">
          <Grid>
            <Text.H2>Index ETFs Comparison</Text.H2>
            <Grid.Ul>
              {Object.entries(INDEX).map(([key, value]) => (
                <Grid.Li key={key}>
                  <NextLink href={`/${value.join('/')}`}>{key}</NextLink>
                </Grid.Li>
              ))}
            </Grid.Ul>
          </Grid>
          <Grid>
            <Text.H2>Sector ETFs Comparison</Text.H2>
            <Grid.Ul>
              {Object.entries(SECTOR).map(([key, value]) => (
                <Grid.Li key={key}>
                  <NextLink href={`/${value.join('/')}`}>{key}</NextLink>
                </Grid.Li>
              ))}
            </Grid.Ul>
          </Grid>
          <Grid>
            <Text.H2>Misc ETFs Comparison</Text.H2>
            <Grid.Ul>
              {Object.entries(ETC).map(([key, value]) => (
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
