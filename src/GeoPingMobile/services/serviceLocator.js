"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceLocator {
    constructor() {
        this.container = new Map();
    }
    get(type) {
        return this.container.get(type);
    }
    set(type, implementation) {
        this.container.set(type, implementation);
    }
}
exports.default = ServiceLocator;
