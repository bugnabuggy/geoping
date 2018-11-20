"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
const helper_1 = require("../helper");
class ProfileService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    loadProfileData() {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.loadUserProfile)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    upgradeAccount() {
        return new Promise(resolve => '');
    }
    updateProfileData(data) {
        return new Promise((resolve, reject) => {
            this.communicator.put(endpoints_1.updateUserProfile, data)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
        // return this.communicator.put( updateUserProfile, data );
    }
    saveAvatar(avatar) {
        return new Promise((resolve, reject) => {
            this.communicator.put(endpoints_1.updateAvatar, { Avatar: avatar })
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = ProfileService;
