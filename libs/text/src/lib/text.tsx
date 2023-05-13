import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface StyledTextProps {
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: ColorNames;
  bg?: ColorNames;
  small?: boolean;
  p?: string;
  m?: string;
}

const StyledText = styled.span<StyledTextProps>`
  background: ${(props) => (props.bg ? props.theme[props.bg] : 'transparent')};
  text-align: ${({ align: textAlign }) => textAlign ?? 'left'};
  font-size: ${({ small }) => (small ? '0.825em' : 'auto')};
  text-transform: ${({ transform }) => transform ?? 'none'};
  color: ${({ theme, color }) => theme[color || 'WHITE']};
  padding: ${({ p }) => p ?? 0};
  margin: ${({ m }) => m ?? 0};
`;

type TextProps<T extends HTMLParagraphElement> = StyledTextProps &
  DetailedHTMLProps<HTMLAttributes<T>, T>;

function Text<T extends HTMLParagraphElement>({
  variant = 'p',
  ...textProps
}: {
  variant?:
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'strong'
    | 'em'
    | 'code'
    | 'legend'
    | 'label';
} & TextProps<T>) {
  const Component = StyledText.withComponent(variant);

  return <Component {...textProps} />;
}

Text.P = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'p', ...props });

Text.H1 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h1', ...props });

Text.H2 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h2', ...props });

Text.H3 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h3', ...props });

Text.H4 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h4', ...props });

Text.H5 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h5', ...props });

Text.H6 = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'h6', ...props });

Text.Span = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'span', ...props });

Text.Strong = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'strong', ...props });

Text.Em = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'em', ...props });

Text.Code = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'code', ...props });

Text.Legend = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'legend', ...props });

Text.Label = (props: TextProps<HTMLParagraphElement>) =>
  Text<HTMLParagraphElement>({ variant: 'label', ...props });

export default Text;
