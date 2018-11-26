"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../constantsForReducer/user");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const environmentsServiceLocator_1 = require("../services/environmentsServiceLocator");
const environment_1 = require("../enums/environment");
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const userAction_1 = require("./userAction");
const react_native_1 = require("react-native");
exports.useTestPeriod = (email, password) => (dispatch) => {
    environmentsServiceLocator_1.getBuildEnvironment(environment_1.EBuildEnvironment.Test);
    staticStorage_1.default.serviceLocator = environmentsServiceLocator_1.environments.get(environmentsServiceLocator_1.buildEnvironment);
    const authorizationService = staticStorage_1.default.serviceLocator.get('IAuthorization');
    authorizationService.signin(email, password)
        .then((response) => {
        react_native_1.AsyncStorage.setItem('token', response);
        dispatch(useTestPeriodAction(true));
        dispatch(userAction_1.redirectDaschboardAction(true));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Actions */
function useTestPeriodAction(authorization) {
    return { type: user_1.USER_AUTHORIZATION_TEST_PERIOD, authorization };
}
