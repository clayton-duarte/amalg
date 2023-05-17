import { render } from '@testing-library/react';

import Chart from './chart';

describe('Chart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Chart
        xAxis={'a'}
        yAxis={'b'}
        data={[
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 3, c: 4 },
          { a: 3, b: 4, c: 5 },
        ]}
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
