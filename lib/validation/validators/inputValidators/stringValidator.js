"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputValidator_1 = __importDefault(require("../inputValidator"));
class StringValidator extends inputValidator_1.default {
    constructor(input, options) {
        super(input, options);
        this.options = this.options;
        this._validate = () => {
            if (this.options.required) {
                if (this.input === undefined || this.input.length === 0 || this.input.replace(/\s/g, '').length === 0) {
                    this.error = 'required';
                    return false;
                }
            }
            if (this.input !== undefined) {
                if (this.input.length > this.options.maxLength) {
                    this.error = 'tooLong';
                    return false;
                }
                if (this.options.pattern) {
                    const regex = new RegExp(this.options.pattern);
                    if (!regex.test(this.input)) {
                        this.error = 'invalid';
                        return false;
                    }
                }
            }
            return true;
        };
    }
}
exports.default = StringValidator;
