"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
const secretSettings_1 = require("../../constants/secretSettings");
class AuthorizationService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    signin(email, password) {
        const userSignIn = new FormData();
        userSignIn.append('username', email);
        userSignIn.append('password', password);
        userSignIn.append('client_id', secretSettings_1.client_id);
        userSignIn.append('client_secret', secretSettings_1.client_secret);
        userSignIn.append('grant_type', secretSettings_1.grant_type);
        userSignIn.append('scope', secretSettings_1.scope);
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.getToken, userSignIn)
                .then((response) => {
                if (response.status === 200) {
                    react_native_1.AsyncStorage.setItem('token', response.data.access_token);
                    react_native_1.AsyncStorage.setItem('token_type', response.data.token_type);
                    resolve(response.data.access_token);
                }
                reject({ error: { response: { status: response.status } } });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    registrationUser(registrationUserData) {
        const user = {
            UserName: registrationUserData.login,
            Email: registrationUserData.email,
            Password: registrationUserData.password,
        };
        return this.communicator.post(endpoints_1.registration, user);
    }
}
exports.default = AuthorizationService;
