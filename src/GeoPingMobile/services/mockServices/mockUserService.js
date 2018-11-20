"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkinStatisticsMock_1 = require("../../mocks/checkinStatisticsMock");
// import * as uuidV5 from 'uuid/v5';
class MockUserService {
    loadUsersForSharedList(idCheckLists) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(checkinStatisticsMock_1.users.filter((item) => item.idList === idCheckLists));
            }, 1000);
        });
    }
    loadUserForStatistic(idList) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).check_in_statistics_users
                    .filter((item) => item.idList === idList));
            }, 1000);
        });
    }
    changePassword(password, newPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Password was successfully changed');
            }, 1000);
        });
    }
    loadUserData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).userData);
            }, 1000);
        });
    }
    sendLoginOrEmail(loginOrEmail) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(loginOrEmail);
            }, 1000);
        });
    }
    sendNewPassword(userId, token, newPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(newPassword);
            }, 1000);
        });
    }
    confirmEmail(userId, token) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ff');
            }, 1000);
        });
    }
}
exports.default = MockUserService;
