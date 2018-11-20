"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
class AuthorizationService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    signin(email, password) {
        const userSignIn = new FormData();
        userSignIn.append('username', email);
        userSignIn.append('password', password);
        userSignIn.append('client_id', process.env.REACT_APP_CLIENT_ID);
        userSignIn.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
        userSignIn.append('grant_type', process.env.REACT_APP_GRANT_TYPE);
        userSignIn.append('scope', process.env.REACT_APP_SCOPE);
        // return this.communicator.post( getToken, userSignIn );
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.getToken, userSignIn)
                .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('token_type', response.data.token_type);
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
