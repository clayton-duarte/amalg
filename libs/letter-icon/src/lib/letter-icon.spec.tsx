import { render } from '@testing-library/react';

import LetterIcon, { WordIcon } from './letter-icon';

describe('LetterIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LetterIcon letter="a" />);

    expect(baseElement).toBeTruthy();
  });
});

describe('WordIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WordIcon word="test" />);

    expect(baseElement).toBeTruthy();
  });
});
