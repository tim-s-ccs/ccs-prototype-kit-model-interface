"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../validator"));
class StaticModelValidator extends validator_1.default {
    constructor(model, options = {}) {
        super(options);
        this._validate = () => {
            if (this.model.data === undefined) {
                this.error = 'required';
                return false;
            }
            return true;
        };
        this.model = model;
    }
}
exports.default = StaticModelValidator;
