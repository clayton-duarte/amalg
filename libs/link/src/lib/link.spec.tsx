import { render } from '@testing-library/react';

import Link, { NextLink } from './link';

describe('Link', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Link href="#">test</Link>);

    expect(baseElement).toBeTruthy();
  });
});

describe('NextLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLink href="#">test</NextLink>);

    expect(baseElement).toBeTruthy();
  });
});
