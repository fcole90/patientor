"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    try {
        res.send(patientsService_1.default.getOnePatient(req.params.id));
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
router.post('/', (req, res) => {
    try {
        res.send(patientsService_1.default.addPatient(req.body));
    }
    catch (error) {
        res.status(400).send(error.message);
        throw error;
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        console.log(req.body);
        res.send(patientsService_1.default.addEntryToPatient(req.params.id, req.body));
    }
    catch (error) {
        if (error.message.startsWith("Could not find any")) {
            res.status(404).send(error.message);
        }
        else {
            res.status(400).send(error.message);
            throw error;
        }
    }
});
exports.default = router;
