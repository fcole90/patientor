"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.assertIsDateString = exports.isDateString = exports.asSafeNumber = exports.assertIsArray = exports.isArray = exports.assertIsDate = exports.isDate = exports.assertIsNumber = exports.isNumber = exports.assertIsString = exports.isString = exports.assertNotNone = exports.assertIs = exports.AssertionError = exports.ConversionError = void 0;
class ConversionError extends Error {
    constructor(message, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ConversionError);
        }
        this.name = 'ConversionError';
        this.message = message;
    }
}
exports.ConversionError = ConversionError;
class AssertionError extends Error {
    constructor(message, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AssertionError);
        }
        this.name = 'AssertionError';
        this.message = message;
    }
}
exports.AssertionError = AssertionError;
const assertIs = (x, checkIs, typeName = null) => {
    if (!checkIs(x)) {
        throw new AssertionError(`${x} is not of the expected type '${typeName !== null && typeName !== void 0 ? typeName : ''}'`);
    }
    return x;
};
exports.assertIs = assertIs;
const assertNotNone = (x, name) => {
    if (x === undefined) {
        throw new AssertionError(`${name !== null && name !== void 0 ? name : 'value'} is undefinded`);
    }
    if (x === null) {
        throw new AssertionError(`${name !== null && name !== void 0 ? name : 'value'} is null`);
    }
    return x;
};
exports.assertNotNone = assertNotNone;
const isString = (x) => {
    return typeof x === 'string' || x instanceof String;
};
exports.isString = isString;
const assertIsString = (x) => {
    if (!exports.isString(x)) {
        throw new AssertionError(`${x} is not a string`);
    }
    return x;
};
exports.assertIsString = assertIsString;
const isNumber = (x) => {
    return typeof x === 'number' || x instanceof Number;
};
exports.isNumber = isNumber;
const assertIsNumber = (x) => {
    if (!exports.isNumber(x)) {
        throw new AssertionError(`${x} is not a number`);
    }
    return x;
};
exports.assertIsNumber = assertIsNumber;
const isDate = (x) => {
    return (!(!x) && exports.isString(x) && !isNaN(Date.parse(x)));
};
exports.isDate = isDate;
const assertIsDate = (x) => {
    if (!exports.isDate(x)) {
        throw new AssertionError(`${x} is not a Date`);
    }
    return x;
};
exports.assertIsDate = assertIsDate;
const isArray = (x) => {
    return x instanceof Array;
};
exports.isArray = isArray;
const assertIsArray = (x) => {
    if (!exports.isArray(x)) {
        throw new AssertionError(`${x} is not an Array`);
    }
    return x;
};
exports.assertIsArray = assertIsArray;
const asSafeNumber = (x) => {
    const converted = Number(x);
    if (isNaN(converted)) {
        throw new ConversionError(`'${x}' is not a number`);
    }
    return converted;
};
exports.asSafeNumber = asSafeNumber;
const isDateString = (x) => {
    return (!(!x) && exports.isString(x) && Boolean(Date.parse(x)));
};
exports.isDateString = isDateString;
const assertIsDateString = (x) => {
    if (!exports.isDateString(x)) {
        throw new AssertionError(`${x} is not a DateString`);
    }
    return x;
};
exports.assertIsDateString = assertIsDateString;
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
