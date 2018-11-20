"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environmentsServiceLocator_1 = require("./environmentsServiceLocator");
class StaticStorage {
}
StaticStorage.serviceLocator = environmentsServiceLocator_1.environments.get(environmentsServiceLocator_1.buildEnvironment);
exports.default = StaticStorage;
