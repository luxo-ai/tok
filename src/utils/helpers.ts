import { Nil, Nilable } from '../types';

export const isNil = <T>(value: Nilable<T>): value is Nil => {
  return value === null || value === undefined;
};
