import Stack from './Stack';

describe('Stack', () => {
  it('should be able to push and pop elements', () => {
    const stack = new Stack<number>();
    const [value1, stack1] = stack.push(1).pop();
    const [value2, stack2] = stack1.push(2).pop();
    const [value3, stack3] = stack2.push(3).pop();

    expect(value1).toBe(1);
    expect(value2).toBe(2);
    expect(value3).toBe(3);
    expect(stack.isEmpty()).toBe(true);
    expect(stack1.isEmpty()).toBe(true);
    expect(stack2.isEmpty()).toBe(true);
    expect(stack3.isEmpty()).toBe(true);
  });

  it('should be able to peek at the top element', () => {
    const stack = new Stack<number>();
    const stack1 = stack.push(1);
    const stack2 = stack1.push(2);
    const stack3 = stack2.push(3);

    expect(stack3.peek()).toBe(3);
    expect(stack2.peek()).toBe(2);
    expect(stack1.peek()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
  });

  it('should be able to check if it is empty', () => {
    const stack = new Stack<number>();
    const stack1 = stack.push(1);
    const stack2 = stack1.push(2);
    const stack3 = stack2.push(3);

    expect(stack.isEmpty()).toBe(true);
    expect(stack1.isEmpty()).toBe(false);
    expect(stack2.isEmpty()).toBe(false);
    expect(stack3.isEmpty()).toBe(false);
  });
});
