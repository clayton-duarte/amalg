import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LetterIconProps {}

const StyledLetterIcon = styled.div`
  color: pink;
`;

export function LetterIcon(props: LetterIconProps) {
  return (
    <StyledLetterIcon>
      <h1>Welcome to LetterIcon!</h1>
    </StyledLetterIcon>
  );
}

export default LetterIcon;
