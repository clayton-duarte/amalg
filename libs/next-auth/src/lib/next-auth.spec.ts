import { describe, it, expect, vi } from 'vitest';

import nextAuthHandler from './next-auth';

vi.mock('../utils', () => ({
  requiredEnvVars: (a) => vi.fn(a),
}));

describe('nextAuth', () => {
  it('should work', () => {
    expect(nextAuthHandler).toBeTruthy();
  });
});
