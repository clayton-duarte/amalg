import axios from 'axios';

import { getDividendHistory } from './dividend-history';
import { html, result } from '../mocks/vdy';

describe('dividendHistory', () => {
  it('should work', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: html });

    expect(await getDividendHistory('VDY.TO')).toEqual(result);
  });
});
