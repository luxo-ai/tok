import { Readable } from 'stream';
import CharReader from './Reader';
import { TokenType } from './token';

// \p{Zs}: Matches any kind of space (s) separator character
// \p{C}: Matches any control characters used to format
const WHITE_SPACE_REG = /\p{Zs}|\s|\p{C}/u;
// \p{L}: Matches any kind of letter from any language.
// \p{M}: Matches combining marks (accents, diacritics).
const LETTER_REG = /\p{L}|\p{M}/u;
// \p{N}: Matches any kind of numeric character.
const NUMBER_REG = /\p{N}/u;
// \p{Sc}: Matches any currency symbol
// \p{P}: Matches any kind of punctuation character.
// [+\-*/^%]: Matches math operators
const PUNCTUATION_REG = /\p{P}|\p{Sc}|[+\-*/^%]/u;

async function tok(file: File) {
  const tokenStream = new Readable();
  const reader = CharReader.openf(file);

  while (!reader.isClosed) {
    const character = await reader.read();

    // white space
    if (WHITE_SPACE_REG.test(character)) {
      const whiteSpaces = await reader.readWhile(c => WHITE_SPACE_REG.test(c));
      tokenStream.push(tokenAsString([character, ...whiteSpaces], TokenType.WHITE_SPACE));
      continue;
    }

    // punctuation
    if (PUNCTUATION_REG.test(character)) {
      tokenStream.push(tokenAsString(character, TokenType.PUNCTUATON));
      continue;
    }

    // number
    if (NUMBER_REG.test(character)) {
      const numbers = await reader.readWhile(c => NUMBER_REG.test(c));
      const lookahead = await reader.read();
      // handle comma too?
      if (lookahead === '.') {
        const decimalDigits = await reader.readWhile(c => NUMBER_REG.test(c));
        if (decimalDigits.length > 0) {
          tokenStream.push(
            tokenAsString([character, ...numbers, '.', ...decimalDigits], TokenType.FLOAT)
          );
          continue;
        }
      }
      // otherwise pushback the lookahead, it's an int
      reader.pushBackChar(lookahead);
      tokenStream.push(tokenAsString([character, ...numbers], TokenType.INTEGER));
      continue;
    }

    // word
    if (LETTER_REG.test(character)) {
      const word = await reader.readWhile(c => LETTER_REG.test(c));
      tokenStream.push(tokenAsString([character, ...word], TokenType.WORD));
      continue;
    }

    // unknown character
    // tokenStream.push(tokenAsString(character, TokenType.UNKNOWN_CHAR));
  }

  tokenStream.push(null);
  return tokenStream;
}

const tokenAsString = (tokenValues: string[] | string, tokenType: TokenType) => {
  return `<TYPE=${tokenType},VALUE=${JSON.stringify([tokenValues].flatMap(v => v).join(''))}>`;
};

export default tok;
