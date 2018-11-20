"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serviceLocator_1 = __importDefault(require("./serviceLocator"));
const environment_1 = require("../enums/environment");
exports.testServiceLocator = new serviceLocator_1.default();
exports.httpServiceLocator = new serviceLocator_1.default();
exports.environments = new Map();
exports.buildEnvironment = environment_1.EBuildEnvironment.HTTP;
function getBuildEnvironment(env) {
    exports.buildEnvironment = env;
}
exports.getBuildEnvironment = getBuildEnvironment;
