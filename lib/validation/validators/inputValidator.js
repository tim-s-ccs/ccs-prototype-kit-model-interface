"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../validator"));
class InputValidator extends validator_1.default {
    constructor(input, options = {}) {
        super(options);
        this.input = input;
    }
}
exports.default = InputValidator;
