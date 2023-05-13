import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface ButtonProps {
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  color?: ColorNames;
}

export default styled.button<ButtonProps>`
  text-transform: ${({ transform }) => transform ?? 'uppercase'};
  color: ${(props) => props.theme.WHITE};
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: ${(props) =>
    props.color ? props.theme[props.color] : props.theme.PRIMARY};
  &:hover {
    filter: brightness(1.1);
  }
  &:disabled {
    filter: greyscale(1);
  }
`;
