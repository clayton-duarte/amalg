import { EventAttributes, createEvents } from 'ics';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getDividendHistory } from '@amalg/dividend-history';

const SYMBOLS = ['SCHD', 'ZRE.TO', 'ZAG.TO', 'HEQT.TO', 'CASH.TO'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventsPerSymbol = await Promise.all(
    SYMBOLS.map(async (symbol) => {
      const { quote, dividends } = await getDividendHistory(symbol);
      const last6Months = dividends.slice(0, 6);
      const events: EventAttributes[] = [];

      last6Months.forEach((dividend) => {
        const exDate = dividend.exDate.split('-');

        const exDateArr: EventAttributes['start'] = [
          Number(exDate[0]),
          Number(exDate[1]),
          Number(exDate[2]),
        ];

        const payDate = dividend.payDate.split('-');

        const payDateArr: EventAttributes['start'] = [
          Number(payDate[0]),
          Number(payDate[1]),
          Number(payDate[2]),
        ];

        const today = new Date().toLocaleDateString();

        events.push({
          title: `${quote.symbol} - EX Date`,
          description: `Dividend: $${dividend.amount.toFixed(2)}`,
          duration: { days: 1 },
          start: exDateArr,
          lastModified: today,
        });

        events.push({
          title: `${quote.symbol} - Pay Date`,
          description: `Dividend: $${dividend.amount.toFixed(2)}`,
          duration: { days: 1 },
          start: payDateArr,
          lastModified: today,
        });
      });

      return events;
    })
  );

  const icsFormat = createEvents(eventsPerSymbol.flat());

  if (icsFormat.error) {
    res.status(500).send(icsFormat.error);

    return;
  }

  res.setHeader('Content-Type', 'text/calendar');

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=dividends-calendar.ics'
  );

  res.status(200).send(icsFormat.value);
}
