export enum TokenType {
  // numbers
  INTEGER = 'Int',
  FLOAT = 'Float',
  // time and date
  // TIME,
  // DATE,
  // punctuation
  PUNCTUATON = 'Punct',
  // word
  WORD = 'Word',
  WHITE_SPACE = 'Space',
  UNKNOWN_CHAR = 'Unknown',
}

export const isNumber = ({ type }: Token) => type === TokenType.INTEGER || type === TokenType.FLOAT;

export type Token = {
  type: TokenType;
  value: string;
};
