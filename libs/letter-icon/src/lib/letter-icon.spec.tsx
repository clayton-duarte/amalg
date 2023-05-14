import { render } from '@testing-library/react';

import LetterIcon from './letter-icon';

describe('LetterIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LetterIcon />);
    expect(baseElement).toBeTruthy();
  });
});
