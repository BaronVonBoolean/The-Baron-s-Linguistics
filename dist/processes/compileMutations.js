"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileMutations = compileMutations;
const promises_1 = __importDefault(require("fs/promises"));
const PhoneMap_1 = require("../classes/phonology/PhoneMap");
async function compileMutations(filepath) {
    const rulesFileText = await promises_1.default.readFile(filepath, 'utf-8');
    const rules = rulesFileText.split('\n').filter(r => r !== '');
    const compiledRules = rules.map(rule => {
        const [mutation, environment] = rule.split(':');
        const [targetPhoneme, mapToPhoneme] = mutation.split('->');
        return new PhoneMap_1.PhoneMap(environment.trim(), targetPhoneme.trim(), mapToPhoneme.trim());
    });
    return compiledRules;
}
