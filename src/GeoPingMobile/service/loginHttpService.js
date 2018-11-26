"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const endpoints_1 = require("../constants/endpoints");
const helper_1 = require("./helper");
class LoginHttpService {
    login(data) {
        return new Promise((resolve, reject) => {
            axios_1.default.post(endpoints_1.getToken, data)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getMyCheckLists(token) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(endpoints_1.getAllGeoLists, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = LoginHttpService;
