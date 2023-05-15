import type { NextApiRequest, NextApiResponse } from 'next';

import { getYahooDividends } from '@amalg/yahoo-events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const symbol = req.query.symbol as string;
  const history = await getYahooDividends(symbol);

  res.status(200).json(history);
}
