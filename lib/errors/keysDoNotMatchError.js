"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeysDoNotMatchError extends Error {
    constructor() {
        super('The keys in the submitted data do not match the keys in the table');
        this.name = 'KeysDoNotMatchError';
    }
}
exports.default = KeysDoNotMatchError;
