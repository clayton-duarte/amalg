import { render } from '@testing-library/react';

import PriceFluctuation from './price-fluctuation';

const mockChartData = [
  {
    date: '2021-01-01',
    amount: 100,
    symbol: 'test',
    type: 'test',
  },
  {
    date: '2021-02-01',
    amount: 200,
    symbol: 'test',
    type: 'test',
  },
  {
    date: '2021-03-01',
    amount: 300,
    symbol: 'test',
    type: 'test',
  },
  {
    date: '2021-04-01',
    amount: 400,
    symbol: 'test',
    type: 'test',
  },
];

describe('PriceFluctuation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PriceFluctuation historyData={mockChartData} />
    );

    expect(baseElement).toBeTruthy();
  });
});
