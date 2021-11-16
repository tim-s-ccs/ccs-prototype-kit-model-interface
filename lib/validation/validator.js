"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor(options = {}) {
        this.error = '';
        this.valid = (call) => {
            if (!this.condition)
                return true;
            if (this.options.on !== undefined && !this.options.on.includes(call))
                return true;
            return this._validate();
        };
        this.options = options;
        this.condition = options.condition === undefined ? true : options.condition;
    }
}
exports.default = Validator;
