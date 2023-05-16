import { withParams } from './page-decorators';

describe('withParams', () => {
  it('should work', () => {
    expect(withParams(() => null, '')).toBeDefined();
  });
});
