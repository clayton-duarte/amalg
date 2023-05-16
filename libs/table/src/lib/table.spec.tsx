import { render } from '@testing-library/react';

import Table from './table';

describe('Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Table
        data={[
          {
            test: 'asd',
            test2: 2,
            etc: { test: 'test' },
            a: 'a',
          },
        ]}
        headers={{
          test: 'Test',
          test2: 'Test 2',
          etc: 'Etc',
          a: 'A',
        }}
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
