"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationError extends Error {
    constructor() {
        super('Request not authorized');
        this.name = 'AuthenticationError';
    }
}
exports.default = AuthenticationError;
