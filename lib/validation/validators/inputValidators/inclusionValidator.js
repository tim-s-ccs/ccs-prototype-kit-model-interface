"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputValidator_1 = __importDefault(require("../inputValidator"));
class InclusionValidator extends inputValidator_1.default {
    constructor(input, options) {
        super(input, options);
        this.options = this.options;
        this._validate = () => {
            if (!this.options.in.includes(this.input)) {
                this.error = 'invalid';
                return false;
            }
            return true;
        };
    }
}
exports.default = InclusionValidator;
