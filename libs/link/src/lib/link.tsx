import NextLinkComponent from 'next/link';
import { ReactNode } from 'react';

import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

interface LinkProps {
  children: ReactNode;
  href: string;
  color?: ColorNames;
  disabled?: boolean;
  variant?: 'bold';
}

export const Link = styled.a<LinkProps>`
  font-weight: ${(props) => (props.variant === 'bold' ? 'bold' : 'normal')};
  ${(props) => props.disabled && `filter: grayscale(1); opacity: 0.5`};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  color: ${(props) => props.theme[props.color ?? 'PRIMARY']};
  text-decoration: underline;
  cursor: pointer;
`;

export const NextLink = Link.withComponent(NextLinkComponent);

export default Link;
