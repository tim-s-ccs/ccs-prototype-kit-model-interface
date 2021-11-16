"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputValidator_1 = __importDefault(require("../inputValidator"));
class NumberValidator extends inputValidator_1.default {
    constructor(input, options) {
        super(input, options);
        this.options = this.options;
        this._validate = () => {
            if (isNaN(this.input)) {
                this.error = 'notANumber';
                return false;
            }
            if (this.options.onlyInteger && !Number.isInteger(this.input)) {
                this.error = 'notAnInteger';
                return false;
            }
            if (this.options.greaterThan !== undefined && this.input < this.options.greaterThan) {
                this.error = 'greaterThan';
                return false;
            }
            if (this.options.lessThan !== undefined && this.input > this.options.lessThan) {
                this.error = 'lessThan';
                return false;
            }
            return true;
        };
    }
}
exports.default = NumberValidator;
