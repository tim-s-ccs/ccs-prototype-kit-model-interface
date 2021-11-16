"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticRow = exports.getStaticTable = void 0;
const frameworkConfig_1 = __importDefault(require("../frameworkConfig"));
const dataInterface_1 = require("./dataInterface");
const STATIC_DATA_PATH = frameworkConfig_1.default.staticDataPath;
const staticData = (_a = require.main) === null || _a === void 0 ? void 0 : _a.require(`./${STATIC_DATA_PATH}`).default;
const getStaticTables = () => {
    return staticData;
};
const getStaticTable = (tableName, conditions) => {
    return (0, dataInterface_1.getTable)(getStaticTables, { tableName: tableName, conditions: conditions });
};
exports.getStaticTable = getStaticTable;
const getStaticRow = (tableName, id) => {
    return (0, dataInterface_1.getRow)(getStaticTables, { tableName: tableName, id: id });
};
exports.getStaticRow = getStaticRow;
