"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneticMutation = void 0;
const word_1 = require("../word");
const ipa_1 = require("./adapters/ipa");
class PhoneticMutation {
    constructor(rule, alphabet) {
        this.rule = rule;
        this.alphabet = alphabet;
    }
    toString() {
        return `${this.rule.targetPhoneme} -> ${this.rule.mapToPhoneme} : ${this.rule.environment}`;
    }
    mutate(input) {
        const output = new word_1.Word(input.id, {
            ascii: input.ascii,
            ipa: input.ipaParts.join(' '),
            category: input.category,
            lemmaId: input.lemmaId
        });
        if (this.alphabet === 'ipa') {
            const adapter = new ipa_1.IPAAdapter();
            output.ipaParts = adapter.apply(this.rule, output.ipaParts);
        }
        return output;
    }
}
exports.PhoneticMutation = PhoneticMutation;
