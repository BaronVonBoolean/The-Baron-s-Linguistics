"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
class Selector {
    constructor(token, predicate) {
        this.token = token;
        this.predicate = predicate;
    }
    matches(p) {
        return this.predicate(p.vectorize(), p.genera);
    }
}
exports.Selector = Selector;
