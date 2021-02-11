"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const BasicTypesAssertions_1 = require("../utils/BasicTypesAssertions");
const assertNewPatient_1 = __importDefault(require("../utils/assertNewPatient"));
const assertNewEntry_1 = require("../utils/assertNewEntry");
const patients = patients_1.default;
const toPublicPatient = (_a) => {
    var { ssn: _ssn, entries: _entries } = _a, publicPatient = __rest(_a, ["ssn", "entries"]);
    return (publicPatient);
};
const getPatients = () => {
    return patients;
};
const getOnePatient = (id) => {
    BasicTypesAssertions_1.assertIsString(id);
    const patient = patients.find(patient => patient.id == id);
    if (!patient) {
        throw new Error(`Could not find any patient with id ${id}`);
    }
    return patient;
};
const getPublicPatients = () => {
    return getPatients().map(patient => toPublicPatient(patient));
};
const addPatient = (newPatient) => {
    const addedPatient = Object.assign({ id: uuid_1.v1() }, assertNewPatient_1.default(newPatient));
    patients.push(addedPatient);
    return addedPatient;
};
const addEntryToPatient = (patientId, newEntry) => {
    const patient = getOnePatient(patientId);
    const entry = Object.assign({ id: uuid_1.v1() }, assertNewEntry_1.assertNewEntry(newEntry));
    patient.entries = [...patient.entries, entry];
    return patient;
};
exports.default = {
    getPatients,
    getOnePatient,
    getPublicPatients,
    addPatient,
    addEntryToPatient
};
