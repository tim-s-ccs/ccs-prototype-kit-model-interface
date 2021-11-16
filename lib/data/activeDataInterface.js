"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActiveRow = exports.getActiveRow = exports.getActiveTable = void 0;
const frameworkConfig_1 = __importDefault(require("../frameworkConfig"));
const idMismatchError_1 = __importDefault(require("../errors/idMismatchError"));
const keysDoNotMatchError_1 = __importDefault(require("../errors/keysDoNotMatchError"));
const unexpectedDataTypeError_1 = __importDefault(require("../errors/unexpectedDataTypeError"));
const dataInterface_1 = require("./dataInterface");
const ACTIVE_DATA_SCHEMA_PATH = frameworkConfig_1.default.activeDataSchemaPath;
const activeDataSchema = (_a = require.main) === null || _a === void 0 ? void 0 : _a.require(`./${ACTIVE_DATA_SCHEMA_PATH}`).default;
const getActiveTables = (req) => {
    return req === null || req === void 0 ? void 0 : req.session.data.tables;
};
const getActiveTable = (req, tableName, conditions) => {
    return (0, dataInterface_1.getTable)(getActiveTables, { req: req, tableName: tableName, conditions: conditions });
};
exports.getActiveTable = getActiveTable;
const getActiveRow = (req, tableName, id) => {
    return (0, dataInterface_1.getRow)(getActiveTables, { req: req, tableName: tableName, id: id });
};
exports.getActiveRow = getActiveRow;
const validateSentData = (req, tableName, id, sentData) => {
    const rowScheme = activeDataSchema[tableName];
    const rowKeys = Object.keys(rowScheme).sort();
    const sentRowKeys = Object.keys(sentData).sort();
    if (!(rowKeys.length === sentRowKeys.length && rowKeys.every((key, index) => key === sentRowKeys[index]))) {
        throw new keysDoNotMatchError_1.default();
    }
    rowKeys.forEach((key) => {
        if (sentData[key] !== undefined && rowScheme[key] !== typeof (sentData[key]))
            throw new unexpectedDataTypeError_1.default(key, tableName, rowScheme[key], typeof (sentData[key]));
    });
    if (getActiveRow(req, tableName, id).id !== sentData.id)
        throw new idMismatchError_1.default();
};
const setActiveRow = (req, tableName, id, data) => {
    validateSentData(req, tableName, id, data);
    const tables = getActiveTables(req);
    const index = tables[tableName].map(row => row.id).indexOf(id);
    tables[tableName][index] = data;
};
exports.setActiveRow = setActiveRow;
