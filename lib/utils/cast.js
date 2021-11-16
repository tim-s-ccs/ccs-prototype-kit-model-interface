"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cast = (input, targetType) => {
    switch (targetType) {
        case 'number':
            if (input.length > 0) {
                return Number(input);
            }
            else {
                return undefined;
            }
        case 'boolean':
            return String(input) === 'true';
        case 'string':
            return String(input);
    }
};
exports.default = cast;
