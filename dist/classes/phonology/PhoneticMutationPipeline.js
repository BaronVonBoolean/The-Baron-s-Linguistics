"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneticMutationPipeline = void 0;
const PhoneticMutation_1 = require("./PhoneticMutation");
class PhoneticMutationPipeline {
    constructor(ruleset, alphabet) {
        this.rules = ruleset;
        this.alphabet = alphabet;
    }
    run(input) {
        this.rules.forEach(rule => {
            const mutation = new PhoneticMutation_1.PhoneticMutation(rule, this.alphabet);
            input = mutation.mutate(input);
        });
        return input;
    }
}
exports.PhoneticMutationPipeline = PhoneticMutationPipeline;
