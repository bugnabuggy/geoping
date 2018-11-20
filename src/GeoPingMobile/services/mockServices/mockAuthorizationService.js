"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testUser = __importStar(require("../../mocks/testUser.json"));
class MockAuthorizationService {
    getVirtualDatabase() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                sessionStorage.setItem('localDB', JSON.stringify(testUser));
                resolve('ok');
            }, 1000);
        });
    }
    signin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.getVirtualDatabase()
                    .then((response) => {
                    const token = JSON.parse(sessionStorage.getItem('localDB')).token;
                    localStorage.setItem('token', token);
                    resolve(token);
                })
                    .catch((error) => {
                    reject(error);
                });
            }, 1000);
        });
    }
    registrationUser(registrationUserData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('');
            }, 1000);
        });
    }
}
exports.default = MockAuthorizationService;
