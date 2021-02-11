"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNewEntry = exports.assertDiagnosis = void 0;
const types_1 = require("../types");
const BasicTypesAssertions_1 = require("./BasicTypesAssertions");
const assertDiagnosis = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'diagnosis');
    return {
        code: BasicTypesAssertions_1.assertIsString(object.code),
        name: BasicTypesAssertions_1.assertIsString(object.name),
        latin: object.latin === undefined ? undefined : BasicTypesAssertions_1.assertIsString(object.latin),
    };
};
exports.assertDiagnosis = assertDiagnosis;
const isEntryType = (x) => (BasicTypesAssertions_1.isString(x) && ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(x));
const assertIsEntryType = (x) => {
    if (!isEntryType(x)) {
        throw new BasicTypesAssertions_1.AssertionError(`${x} is not an Entry['type']`);
    }
    return x;
};
const assertBaseEntry = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'Entry');
    return {
        description: BasicTypesAssertions_1.assertIsString(object.description),
        date: BasicTypesAssertions_1.assertIsDateString(object.date),
        specialist: BasicTypesAssertions_1.assertIsString(object.specialist),
        diagnosisCodes: object.diagnosisCodes === undefined ? undefined :
            BasicTypesAssertions_1.assertIsArray(object.diagnosisCodes).map(code => BasicTypesAssertions_1.assertIsString(code))
    };
};
const assertHealthCheckRating = (x) => {
    if (!Object.values(types_1.HealthCheckRating).filter(BasicTypesAssertions_1.isNumber).includes(BasicTypesAssertions_1.assertIsNumber(x))) {
        throw new BasicTypesAssertions_1.AssertionError(`${x} is not an HealthCheckRating value: ${Object.values(types_1.HealthCheckRating).join(' | ')}`);
    }
    return x;
};
const assertHealthCheckEntry = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'Entry');
    return Object.assign(Object.assign({}, assertBaseEntry(object)), { type: "HealthCheck", healthCheckRating: assertHealthCheckRating(object.healthCheckRating) });
};
const assertDischarge = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'discharge');
    return {
        date: BasicTypesAssertions_1.assertIsDateString(object.date),
        criteria: BasicTypesAssertions_1.assertIsString(object.criteria)
    };
};
const assertHospitalEntry = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'Entry');
    return Object.assign(Object.assign({}, assertBaseEntry(object)), { type: "Hospital", discharge: assertDischarge(object.discharge) });
};
const assertSickLeave = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'sickleave');
    return {
        startDate: BasicTypesAssertions_1.assertIsDateString(object.startDate),
        endDate: BasicTypesAssertions_1.assertIsDateString(object.endDate)
    };
};
const assertOccupationalHealthcare = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'Entry');
    return Object.assign(Object.assign({}, assertBaseEntry(object)), { type: "OccupationalHealthcare", employerName: BasicTypesAssertions_1.assertIsString(object.employerName), sickLeave: object.sickLeave === undefined ? undefined
            : assertSickLeave(object.sickLeave) });
};
const assertNewEntry = (x) => {
    const object = BasicTypesAssertions_1.assertNotNone(x, 'Entry');
    assertIsEntryType(object.type);
    switch (object.type) {
        case "HealthCheck":
            assertHealthCheckEntry(object);
            const entry = Object.assign(Object.assign({}, object), { type: 'HealthCheck', healthCheckRating: object.healthCheckRating });
            return entry;
        case "OccupationalHealthcare":
            return assertOccupationalHealthcare(object);
        case "Hospital":
            return assertHospitalEntry(object);
        default:
            return BasicTypesAssertions_1.assertNever(object);
    }
};
exports.assertNewEntry = assertNewEntry;
