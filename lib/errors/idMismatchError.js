"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IDMismatchError extends Error {
    constructor() {
        super('The ID in the url and the request data do not match');
        this.name = 'IDMismatchError';
    }
}
exports.default = IDMismatchError;
