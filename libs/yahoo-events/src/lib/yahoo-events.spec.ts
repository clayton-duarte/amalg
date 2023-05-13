import { getYahooHistory } from './yahoo-events';

describe('yahooEvents', () => {
  it('should work', () => {
    expect(getYahooHistory).toBeTruthy();
  });
});
