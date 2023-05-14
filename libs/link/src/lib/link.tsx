import NextLink from 'next/link';

import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface LinkProps {
  color?: ColorNames;
  disabled?: boolean;
  variant?: 'bold';
}

export default styled(NextLink)<LinkProps>`
  text-decoration: underline;
  cursor: pointer;
  font-weight: ${(props) => (props.variant === 'bold' ? 'bold' : 'normal')};
  text-decoration: ${(props) => (props.disabled ? 'none' : 'underline')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  color: ${(props) =>
    props.disabled
      ? props.theme.SECONDARY
      : props.theme[props.color ?? 'PRIMARY']};
`;
