import type { NextApiRequest, NextApiResponse } from 'next';

import { getDividendHistory } from '@amalg/dividend-history';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const symbol = req.query.symbol as string;
  const history = await getDividendHistory(symbol);

  res.status(200).json(history);
}
