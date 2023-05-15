import axios from 'axios';
import { expect, vi } from 'vitest';

import { getDividendHistory } from './dividend-history';
import { html, result } from './dividend-history.mocks';

describe('dividendHistory', () => {
  it('should work', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: html });

    expect(await getDividendHistory('VDY.TO')).toEqual(result);
  });
});
