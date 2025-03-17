"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneticMutationPipeline = void 0;
const PhoneMap_1 = require("../phonology/PhoneMap");
class PhoneticMutationPipeline {
    constructor(ruleset) {
        this.rules = ruleset;
    }
    run(input, validOutputs) {
        let output = input.clone();
        this.rules.forEach(rule => {
            const mutation = new PhoneMap_1.PhoneMap(rule.environment, rule.targetPhoneme, rule.mapToPhoneme);
            output = mutation.apply(output, validOutputs);
        });
        return output;
    }
}
exports.PhoneticMutationPipeline = PhoneticMutationPipeline;
