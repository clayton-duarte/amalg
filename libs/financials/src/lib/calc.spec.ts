import { calcDividendDrip } from './calc';

describe('calcDividendDrip', () => {
  it('should work', () => {
    expect(calcDividendDrip(1)).toMatchInlineSnapshot('"1200"');

    expect(calcDividendDrip(1.99)).toMatchInlineSnapshot('"603"');

    expect(calcDividendDrip(10)).toMatchInlineSnapshot('"120"');

    expect(calcDividendDrip(0)).toMatchInlineSnapshot('"0"');
  });
});
