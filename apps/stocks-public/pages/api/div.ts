import type { NextApiRequest, NextApiResponse } from 'next';

import { getYahooDividends } from '@cpd/yahoo-events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const history = await getYahooDividends('PETR4.SA');

  res.status(200).json(history);
}
