"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RowNotFoundError extends Error {
    constructor(tableName, id) {
        super(`A row with ID ${id} for the table ${tableName} could not be found`);
        this.name = 'RowNotFoundError';
    }
}
exports.default = RowNotFoundError;
