import type { NextApiRequest, NextApiResponse } from 'next';

import { getYahooHistory } from '@cpd/yahoo-events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const history = await getYahooHistory('PETR4.SA');

  res.status(200).json(history);
}
