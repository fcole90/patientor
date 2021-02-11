"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.HealthCheckRating = void 0;
// ---------------------------------------------------------------------------------------------------------------------------------------
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["TransMale"] = "transmale";
    Gender["Female"] = "female";
    Gender["TransFemale"] = "transfemale";
    Gender["GenderQueer"] = "genderqueer";
    Gender["Other"] = "other";
    Gender["Unknown"] = "unknown";
})(Gender = exports.Gender || (exports.Gender = {}));
