import { isNil } from './helpers';
import { Nullable } from '../types';

type StackNode<T> = Nullable<{
  value: T;
  previous: StackNode<T>;
}>;

// stack implementation using an immutable singly linked list.
class Stack<T> {
  private readonly head: StackNode<T>;

  /**
   * Creates an instance of an immutable stack.
   */
  constructor(head: StackNode<T> = null) {
    this.head = head;
    Object.freeze(this);
  }

  push(value: T): Stack<T> {
    return new Stack<T>({ value, previous: this.head });
  }

  pop(): [Nullable<T>, Stack<T>] {
    const value = this.peek();
    return [value, !isNil(this.head) ? new Stack<T>(this.head.previous) : this];
  }

  peek(): Nullable<T> {
    return !isNil(this.head) ? this.head.value : null;
  }

  isEmpty(): boolean {
    return isNil(this.head);
  }
}

export default Stack;
