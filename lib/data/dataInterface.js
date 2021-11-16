"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRow = exports.getTable = void 0;
const rowNotFoundError_1 = __importDefault(require("../errors/rowNotFoundError"));
const tableNotFoundError_1 = __importDefault(require("../errors/tableNotFoundError"));
const getTable = (getTables, options) => {
    let table = getTables(options.req)[options.tableName];
    if (table === undefined)
        throw new tableNotFoundError_1.default(options.tableName);
    if (options.conditions !== undefined) {
        options.conditions.forEach(condition => {
            table = table.filter(row => row[condition.attribute] === condition.value);
        });
    }
    return table;
};
exports.getTable = getTable;
const getRow = (getTables, options) => {
    const table = getTable(getTables, options);
    const row = table.find(row => row.id === options.id);
    if (row === undefined)
        throw new rowNotFoundError_1.default(options.tableName, options.id);
    return row;
};
exports.getRow = getRow;
