"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
const helper_1 = require("../helper");
class UserService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    loadUsersForSharedList(idChecklists) {
        return new Promise(resolve => '');
    }
    loadUserForStatistic(idList) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getUserAccessedToList.replace('%listid%', idList))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    changePassword(password, newPassword) {
        const data = {
            'OldPassword': password,
            'NewPassword': newPassword,
        };
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.changeUserPassword, data)
                .then((response) => {
                resolve(response.data.messages[0]);
            })
                .catch((error) => {
                if (error.response.status === 400) {
                    reject({ message: error.response.data.messages[0] });
                }
                else {
                    reject(error);
                }
            });
        });
        // ;
    }
    loadUserData() {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.loadUserData)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    sendLoginOrEmail(loginOrEmail) {
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.sendLoginOrEmail.replace('%login%', loginOrEmail), loginOrEmail)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    sendNewPassword(userId, token, newPassword) {
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.resetPassword.replace('%id%', userId).replace('%token%', token).replace('%pass%', newPassword), '')
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    confirmEmail(userId, token) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.confirmEmail.replace('%userId%', userId).replace('%token%', token))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = UserService;
