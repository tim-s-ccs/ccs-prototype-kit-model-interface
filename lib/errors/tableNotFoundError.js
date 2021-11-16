"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableNotFoundError extends Error {
    constructor(tableName) {
        super(`A table with name ${tableName} could not be found`);
        this.name = 'TableNotFoundError';
    }
}
exports.default = TableNotFoundError;
