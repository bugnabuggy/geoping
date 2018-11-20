"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockProfileService {
    loadProfileData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).user_profile);
            }, 1000);
        });
    }
    upgradeAccount() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('profile');
            }, 1000);
        });
    }
    updateProfileData() {
        return new Promise((resolve, reject) => {
            resolve('your credentials was updated');
        });
    }
    saveAvatar(avatar) {
        return new Promise((resolve, reject) => {
            resolve('your credentials was updated');
        });
    }
}
exports.default = MockProfileService;
