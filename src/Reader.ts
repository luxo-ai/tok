import Stack from '@utils/Stack';

const EMPTY_CHAR = '';

class CharReader {
  readonly uint8Decoder: TextDecoder;
  readonly uint8StreamReader: ReadableStreamDefaultReader<Uint8Array>;

  private _isClosed: boolean;
  private chunkStr: string;
  private chunkStrIdx: number;

  private lookahead: Stack<string>;

  private constructor(stream: ReadableStream<Uint8Array>) {
    this.uint8StreamReader = stream.getReader();
    this.uint8Decoder = new TextDecoder();
    this.chunkStr = '';
    this.chunkStrIdx = 0;
    this._isClosed = false;
    this.lookahead = new Stack<string>();
  }

  static openf(file: File): CharReader {
    return new CharReader(file.stream());
  }

  static open(stream: ReadableStream<Uint8Array>): CharReader {
    return new CharReader(stream);
  }

  private async nextChunk(): Promise<string> {
    try {
      const { done, value } = await this.uint8StreamReader.read();
      const nextChunkStr = value ? this.uint8Decoder.decode(value, { stream: true }) : EMPTY_CHAR;

      this.chunkStr = nextChunkStr;
      this.chunkStrIdx = 0;

      if (done) {
        this.closeReader();
      }

      return nextChunkStr;
    } catch (e) {
      this.closeReader();
      throw e;
    }
  }

  private closeReader() {
    this._isClosed = true;
    this.uint8StreamReader.releaseLock();
  }

  get isClosed() {
    return this.lookahead.isEmpty() && this._isClosed;
  }

  async read() {
    if (!this.lookahead.isEmpty()) {
      const [char, nextStack] = this.lookahead.pop();
      this.lookahead = nextStack;
      return char as string;
    }

    // move to next chunk?
    if (this.chunkStrIdx >= this.chunkStr.length) {
      await this.nextChunk();
    }

    return this._isClosed ? EMPTY_CHAR : this.chunkStr[this.chunkStrIdx++];
  }

  async readWhile(predicate: (char: string) => boolean): Promise<string[]> {
    const buffer: string[] = [];

    let currChar = await this.read();

    while (!this.isClosed && predicate(currChar)) {
      buffer.push(currChar);
      currChar = await this.read();
    }

    if (!this.isClosed) {
      this.pushBackChar(currChar);
    }

    return buffer;
  }

  pushBackChar(char: string) {
    this.lookahead = this.lookahead.push(char);
  }
}

export default CharReader;
