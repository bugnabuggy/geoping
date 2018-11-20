"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environmentsServiceLocator_1 = require("./environmentsServiceLocator");
const environment_1 = require("../enums/environment");
const tableHistoryService_1 = __importDefault(require("./httpServices/tableHistoryService"));
const httpService_1 = __importDefault(require("./httpService"));
const staticStorage_1 = __importDefault(require("./staticStorage"));
const mockTableHistoryService_1 = __importDefault(require("./mockServices/mockTableHistoryService"));
const mockAuthorizationService_1 = __importDefault(require("./mockServices/mockAuthorizationService"));
const mockCheckListService_1 = __importDefault(require("./mockServices/mockCheckListService"));
const mockMarkerService_1 = __importDefault(require("./mockServices/mockMarkerService"));
const authorizationService_1 = __importDefault(require("./httpServices/authorizationService"));
const checkListService_1 = __importDefault(require("./httpServices/checkListService"));
const mockUserService_1 = __importDefault(require("./mockServices/mockUserService"));
const markerService_1 = __importDefault(require("./httpServices/markerService"));
const profileService_1 = __importDefault(require("./httpServices/profileService"));
const userService_1 = __importDefault(require("./httpServices/userService"));
const mockProfileService_1 = __importDefault(require("./mockServices/mockProfileService"));
function configurationDependencyInjerction() {
    environmentsServiceLocator_1.environments.set(environment_1.EBuildEnvironment.Test, environmentsServiceLocator_1.testServiceLocator);
    environmentsServiceLocator_1.environments.set(environment_1.EBuildEnvironment.HTTP, environmentsServiceLocator_1.httpServiceLocator);
    staticStorage_1.default.serviceLocator = environmentsServiceLocator_1.environments.get(environmentsServiceLocator_1.buildEnvironment);
    const httpHeader = {};
    /* http services */
    environmentsServiceLocator_1.httpServiceLocator.set('IHttpCommunicator', new httpService_1.default(httpHeader));
    environmentsServiceLocator_1.httpServiceLocator.set('IAuthorization', new authorizationService_1.default());
    environmentsServiceLocator_1.httpServiceLocator.set('ITableHistoryService', new tableHistoryService_1.default());
    environmentsServiceLocator_1.httpServiceLocator.set('ICheckListServiceType', new checkListService_1.default());
    environmentsServiceLocator_1.httpServiceLocator.set('IMarkerServiceType', new markerService_1.default());
    environmentsServiceLocator_1.httpServiceLocator.set('IUser', new userService_1.default());
    environmentsServiceLocator_1.httpServiceLocator.set('IProfileServiceType', new profileService_1.default());
    /* test services */
    environmentsServiceLocator_1.testServiceLocator.set('IAuthorization', new mockAuthorizationService_1.default());
    environmentsServiceLocator_1.testServiceLocator.set('ITableHistoryService', new mockTableHistoryService_1.default());
    environmentsServiceLocator_1.testServiceLocator.set('ICheckListServiceType', new mockCheckListService_1.default());
    environmentsServiceLocator_1.testServiceLocator.set('IMarkerServiceType', new mockMarkerService_1.default());
    environmentsServiceLocator_1.testServiceLocator.set('IUser', new mockUserService_1.default());
    environmentsServiceLocator_1.testServiceLocator.set('IProfileServiceType', new mockProfileService_1.default());
}
exports.configurationDependencyInjerction = configurationDependencyInjerction;
