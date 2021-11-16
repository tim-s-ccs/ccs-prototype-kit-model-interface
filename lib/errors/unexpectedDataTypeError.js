"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnexpectedDataTypeError extends Error {
    constructor(key, table, expectedType, receivedType) {
        super(`There was an unexpected data type for ${key} in ${table}. Expectd type: ${expectedType}. Recieved type: ${receivedType}`);
        this.name = 'UnexpectedDataTypeError';
    }
}
exports.default = UnexpectedDataTypeError;
