"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const BasicTypesAssertions_1 = require("./BasicTypesAssertions");
const isGender = (x) => {
    return Object.values(types_1.Gender).includes(x);
};
const assertIsGender = (x) => {
    if (!isGender(x)) {
        throw new BasicTypesAssertions_1.AssertionError(`${x} is not a Gender`);
    }
    return x;
};
const isEntry = (x) => {
    if (!x) {
        return false;
    }
    return true;
};
const assertIsEntry = (x) => {
    if (!isEntry(x)) {
        throw new BasicTypesAssertions_1.AssertionError(`${x} is not an Entry`);
    }
    return x;
};
const assertNewPatient = (x) => {
    const object = x;
    return {
        name: BasicTypesAssertions_1.assertIsString(object.name),
        dateOfBirth: BasicTypesAssertions_1.assertIsDateString(object.dateOfBirth),
        ssn: BasicTypesAssertions_1.assertIsString(object.ssn),
        gender: assertIsGender(object.gender),
        occupation: BasicTypesAssertions_1.assertIsString(object.occupation),
        entries: object.entries === undefined ? []
            : object.entries.map(entry => assertIsEntry(entry))
    };
};
exports.default = assertNewPatient;
