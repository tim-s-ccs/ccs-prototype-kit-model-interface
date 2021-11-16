"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cast_1 = __importDefault(require("../../utils/cast"));
const model_1 = __importDefault(require("../model"));
const staticModel_1 = __importDefault(require("../static/staticModel"));
const staticModelValidator_1 = __importDefault(require("../../validation/validators/staticModelValidator"));
const activeDataInterface_1 = require("../../data/activeDataInterface");
class ActiveModel extends model_1.default {
    constructor(data, schema = {}) {
        super(data);
        this.errors = {};
        this.validate = (call) => {
            this.errors = {};
            if (this.schema.inputValidations !== undefined) {
                this.schema.inputValidations.forEach(inputValidation => {
                    const attributeValidation = new inputValidation.validator(this.data[inputValidation.attribute], inputValidation.options);
                    this.validateAttribute(call, inputValidation, attributeValidation);
                });
            }
            if (this.schema.customValidations !== undefined) {
                this.schema.customValidations.forEach(customValidation => {
                    const attributeValidation = new customValidation.validator(this, customValidation.options);
                    this.validateAttribute(call, customValidation, attributeValidation);
                });
            }
            if (this.schema.staticModelValidations !== undefined) {
                this.schema.staticModelValidations.forEach(staticModelValidation => {
                    const attributeValidation = new staticModelValidator_1.default(this.data[staticModelValidation.attribute], staticModelValidation.options);
                    this.validateAttribute(call, staticModelValidation, attributeValidation);
                });
            }
            Object.keys(this.data)
                .filter((attribute) => this.data[attribute] instanceof ActiveModel)
                .forEach((attribute) => {
                const model = this.data[attribute];
                if (!model.validate(call)) {
                    this.errors = { ...this.errors, ...model.errors };
                }
            });
            return Object.keys(this.errors).length === 0;
        };
        this.validateAttribute = (call, validation, attributeValidation) => {
            if (!attributeValidation.valid(call)) {
                this.errors[validation.attribute] = {
                    error: attributeValidation.error,
                    errorMessage: validation.errorMessages[attributeValidation.error]
                };
            }
        };
        this.errorList = () => {
            return Object.entries(this.errors).map(([attribute, error]) => {
                return {
                    text: error.errorMessage,
                    href: `#${attribute}-error`
                };
            });
        };
        this.attributes = () => {
            return Object.fromEntries(Object.keys(this.data).map((attribute) => {
                if (this.data[attribute] instanceof model_1.default) {
                    return [`${attribute}ID`, this.data[attribute].data.id];
                }
                else {
                    return [attribute, this.data[attribute]];
                }
            }));
        };
        this.assignAttributes = (data) => {
            for (const attribute in this.data) {
                if (attribute in data) {
                    if (this.data[attribute] instanceof ActiveModel) {
                        this.data[attribute].assignAttributes(data[attribute]);
                    }
                    else if (this.data[attribute] instanceof staticModel_1.default) {
                        const id = (0, cast_1.default)(data[attribute], 'number');
                        if (this.data[attribute].data.id !== id) {
                            this.data[attribute] = new this.data[attribute].constructor(id);
                        }
                    }
                    else {
                        this.data[attribute] = (0, cast_1.default)(data[attribute], typeof this.data[attribute]);
                    }
                }
            }
        };
        this.save = (req) => {
            const activeModelAttributes = Object.keys(this.data).filter((attribute) => this.data[attribute] instanceof ActiveModel);
            activeModelAttributes.forEach(activeModelAttribute => this.data[activeModelAttribute].save(req));
            (0, activeDataInterface_1.setActiveRow)(req, this.tableName, this.data.id, this.attributes());
        };
        this.schema = schema;
    }
}
ActiveModel._find = (req, tableName, id) => {
    return (0, activeDataInterface_1.getActiveRow)(req, tableName, id);
};
ActiveModel._all = (req, tableName) => {
    return (0, activeDataInterface_1.getActiveTable)(req, tableName);
};
ActiveModel._where = (req, tableName, conditions) => {
    return (0, activeDataInterface_1.getActiveTable)(req, tableName, conditions);
};
exports.default = ActiveModel;
