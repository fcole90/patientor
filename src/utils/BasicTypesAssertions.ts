import { DateString } from '../types';

export class ConversionError extends Error {
  constructor(message: string, ...params: Array<string | undefined>) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConversionError);
    }

    this.name = 'ConversionError';
    this.message = message;
  }
}

export class AssertionError extends Error {
  constructor(message: string, ...params: Array<string | undefined>) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AssertionError);
    }

    this.name = 'AssertionError';
    this.message = message;
  }
}

export type TypeChecker = <T, >(x: unknown) => x is T;

export const assertIs = <T,>(x: unknown, checkIs: TypeChecker, typeName: string | null = null): T => {
  if (!checkIs(x)) { throw new AssertionError(`${x as string} is not of the expected type '${typeName ?? ''}'`); }
  return x as T;
};

export const assertNotNone = (x: unknown | null | undefined, name?: string): unknown => {
  if (x === undefined) { throw new AssertionError(`${name ?? 'value'} is undefinded`); }
  if (x === null) { throw new AssertionError(`${name ?? 'value'} is null`); }
  return x;
};

export const isString = (x: unknown): x is string => {
  return typeof x === 'string' || x instanceof String;
};

export const assertIsString = (x: unknown): string => {
  if (!isString(x)) { throw new AssertionError(`${x as string} is not a string`); }
  return x;
};

export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' || x instanceof Number;
};

export const assertIsNumber = (x: unknown): number => {
  if (!isNumber(x)) { throw new AssertionError(`${x as string} is not a number`); }
  return x;
};

export const isDate = (x: unknown): x is Date => {
  return (!(!x) && isString(x) && !isNaN(Date.parse(x)));
};

export const assertIsDate = (x: unknown): Date => {
  if (!isDate(x)) { throw new AssertionError(`${x as string} is not a Date`); }
  return x;
};


export const isArray = (x: unknown): x is Array<unknown> => {
  return x instanceof Array;
};

export const assertIsArray = (x: unknown): Array<unknown> => {
  if (!isArray(x)) { throw new AssertionError(`${x as string} is not an Array`); }
  return x;
};


export const asSafeNumber = (x: unknown): number => {
  const converted = Number(x);
  if (isNaN(converted)) {
    throw new ConversionError(
      `'${x as string}' is not a number`
    );
  }
  return converted;
};

export const isDateString = (x: unknown): x is DateString => {
  return (!(!x) && isString(x) && Boolean(Date.parse(x)));
};

export const assertIsDateString = (x: unknown): DateString => {
  if (!isDateString(x)) { throw new AssertionError(`${x as string} is not a DateString`); }
  return x;
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};