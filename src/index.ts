import tok from './tok';
import fs from 'fs';

const fileBuffer = fs.readFileSync('orwell.txt', 'utf8');
const file = new File([fileBuffer], 'orwell.txt');

void tok(file).then(tokenStream => {
  const outputStream = fs.createWriteStream('orwell.out.txt');
  tokenStream.pipe(outputStream);
});

export default tok;
