import { render } from '@testing-library/react';

import Chart from './chart';

describe('Chart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chart color="tomato">test</Chart>);

    expect(baseElement).toBeTruthy();
  });
});
