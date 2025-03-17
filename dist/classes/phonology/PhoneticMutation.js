"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneticMutation = void 0;
class PhoneticMutation {
    constructor(rule) {
        this.rule = rule;
    }
    toString() {
        return `${this.rule.targetPhoneme} -> ${this.rule.mapToPhoneme} : ${this.rule.environment}`;
    }
    matchesEnvironment(input, index) {
        const [envLeft, envRight] = this.rule.environment.split('_');
        if (envLeft && envRight) {
            const inputLeft = input.ipaParts[index - 1];
            const inputRight = input.ipaParts[index + 1];
            // handle left word boundary
            if (envLeft.trim() === '#' &&
                inputLeft === undefined &&
                inputRight === envRight.trim())
                return true;
            // handle right word boundary
            if (envRight.trim() === '#' &&
                inputRight === undefined &&
                inputLeft === envLeft.trim())
                return true;
            // handle exact match
            return (inputLeft === envLeft.trim() &&
                inputRight === envRight.trim());
        }
        // default to false
        return false;
    }
    mutate(input, validOutputs) {
        const target = validOutputs.find(p => p.ipa === this.rule.targetPhoneme);
        const mapTo = validOutputs.find(p => p.ipa === this.rule.mapToPhoneme);
        if (!target || !mapTo) {
            return input;
        }
        const output = mapTo.clone();
        return output;
    }
    apply(input, allPhonemes) {
        const output = input.clone();
        const outputIpaParts = [];
        for (let i = 0; i < input.ipaParts.length; i++) {
            const currentIpaPart = allPhonemes.find(p => p.ipa === input.ipaParts[i]);
            if (!currentIpaPart)
                continue;
            if (this.matchesEnvironment(input, i)) {
                const mutated = this.mutate(currentIpaPart, allPhonemes);
                outputIpaParts.push(mutated.ipa);
            }
            else {
                outputIpaParts.push(currentIpaPart.ipa);
            }
        }
        output.ipaParts = outputIpaParts;
        return output;
    }
}
exports.PhoneticMutation = PhoneticMutation;
