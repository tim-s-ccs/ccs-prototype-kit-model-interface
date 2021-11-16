"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../model"));
const staticDataInterface_1 = require("../../data/staticDataInterface");
class StaticModel extends model_1.default {
}
StaticModel._find = (tableName, id) => {
    return (0, staticDataInterface_1.getStaticRow)(tableName, id);
};
StaticModel._all = (tableName) => {
    return (0, staticDataInterface_1.getStaticTable)(tableName);
};
StaticModel._where = (tableName, conditions) => {
    return (0, staticDataInterface_1.getStaticTable)(tableName, conditions);
};
exports.default = StaticModel;
