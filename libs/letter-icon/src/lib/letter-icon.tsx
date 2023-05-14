import {
  TbLetterA,
  TbLetterB,
  TbLetterC,
  TbLetterD,
  TbLetterE,
  TbLetterF,
  TbLetterG,
  TbLetterH,
  TbLetterI,
  TbLetterJ,
  TbLetterK,
  TbLetterL,
  TbLetterM,
  TbLetterN,
  TbLetterO,
  TbLetterP,
  TbLetterQ,
  TbLetterR,
  TbLetterS,
  TbLetterT,
  TbLetterU,
  TbLetterV,
  TbLetterW,
  TbLetterX,
  TbLetterY,
  TbLetterZ,
  TbPointFilled,
} from 'react-icons/tb';

import Grid from '@amalg/grid';
import { ColorNames } from '@amalg/theme';

export interface LetterIconProps {
  color?: ColorNames;
  letter: string;
  size?: string;
}

export function WordIcon({
  word,
  ...props
}: Omit<LetterIconProps, 'letter'> & { word: string }) {
  const letters = word.split('');

  return (
    <Grid xs={`repeat(${letters.length}, auto)`} gap="0" align="center">
      {letters.map((letter, index) => (
        <LetterIcon
          {...props}
          key={`letter-icon-${letter}-${index}`}
          letter={letter}
        />
      ))}
    </Grid>
  );
}

export default function LetterIcon(props: LetterIconProps) {
  const letterUpper = props.letter.toUpperCase();

  switch (letterUpper) {
    case 'A':
      return <TbLetterA {...props} />;

    case 'B':
      return <TbLetterB {...props} />;

    case 'C':
      return <TbLetterC {...props} />;

    case 'D':
      return <TbLetterD {...props} />;

    case 'E':
      return <TbLetterE {...props} />;

    case 'F':
      return <TbLetterF {...props} />;

    case 'G':
      return <TbLetterG {...props} />;

    case 'H':
      return <TbLetterH {...props} />;

    case 'I':
      return <TbLetterI {...props} />;

    case 'J':
      return <TbLetterJ {...props} />;

    case 'K':
      return <TbLetterK {...props} />;

    case 'L':
      return <TbLetterL {...props} />;

    case 'M':
      return <TbLetterM {...props} />;

    case 'N':
      return <TbLetterN {...props} />;

    case 'O':
      return <TbLetterO {...props} />;

    case 'P':
      return <TbLetterP {...props} />;

    case 'Q':
      return <TbLetterQ {...props} />;

    case 'R':
      return <TbLetterR {...props} />;

    case 'S':
      return <TbLetterS {...props} />;

    case 'T':
      return <TbLetterT {...props} />;

    case 'U':
      return <TbLetterU {...props} />;

    case 'V':
      return <TbLetterV {...props} />;

    case 'W':
      return <TbLetterW {...props} />;

    case 'X':
      return <TbLetterX {...props} />;

    case 'Y':
      return <TbLetterY {...props} />;

    case 'Z':
      return <TbLetterZ {...props} />;

    case '.' || '-':
      return <TbPointFilled {...props} size={`calc(${props.size}/2)`} />;

    default:
      return null;
  }
}
