"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../validator"));
class CustomValidator extends validator_1.default {
    constructor(model, options = {}) {
        super(options);
        this.model = model;
    }
}
exports.default = CustomValidator;
