import { HTMLAttributes } from 'react';

import { ColorNames } from '@amalg/theme';
import styled from '@emotion/styled';

export interface StyledTextProps {
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: ColorNames;
  small?: boolean;
  bg?: ColorNames;
  bold?: boolean;
  p?: string;
  m?: string;
}

const StyledText = styled.span<StyledTextProps>`
  background: ${(props) => (props.bg ? props.theme[props.bg] : 'transparent')};
  text-align: ${({ align: textAlign }) => textAlign ?? 'left'};
  font-size: ${({ small }) => (small ? '0.825em' : 'auto')};
  text-transform: ${({ transform }) => transform ?? 'none'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ theme, color }) => theme[color || 'WHITE']};
  padding: ${({ p }) => p ?? 0};
  margin: ${({ m }) => m ?? 0};
`;

type TextProps = StyledTextProps & HTMLAttributes<HTMLParagraphElement>;

function Text({
  component = 'p',
  ...textProps
}: TextProps & {
  component?:
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
}) {
  const Component = StyledText.withComponent(component);

  return <Component {...textProps} />;
}

Text.P = (props: TextProps) => Text({ component: 'p', ...props });

Text.H1 = (props: TextProps) => Text({ component: 'h1', bold: true, ...props });

Text.H2 = (props: TextProps) => Text({ component: 'h2', bold: true, ...props });

Text.H3 = (props: TextProps) => Text({ component: 'h3', bold: true, ...props });

Text.H4 = (props: TextProps) => Text({ component: 'h4', bold: true, ...props });

Text.H5 = (props: TextProps) => Text({ component: 'h5', bold: true, ...props });

Text.H6 = (props: TextProps) => Text({ component: 'h6', bold: true, ...props });

Text.Span = (props: TextProps) => Text({ component: 'span', ...props });

Text.Strong = (props: TextProps) =>
  Text({ component: 'strong', bold: true, ...props });

Text.Em = (props: TextProps) => Text({ component: 'em', ...props });

Text.Code = (props: TextProps) => Text({ component: 'code', ...props });

Text.Legend = (props: TextProps) => Text({ component: 'legend', ...props });

Text.Label = (props: TextProps) =>
  Text({ component: 'label', bold: true, ...props });

export default Text;

export { Text };
