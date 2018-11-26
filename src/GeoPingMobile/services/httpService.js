"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_native_1 = require("react-native");
exports.get = (url) => {
    return axios_1.default.get(url);
};
exports.post = (url, data) => {
    return axios_1.default.post(url, data);
};
class HttpCommunicator {
    constructor(_config = {}) {
        // this.accessToken = AsyncStorage.getItem( 'token' ) || '';
        react_native_1.AsyncStorage.getItem('token')
            .then((token) => {
            this.accessToken = token;
        })
            .catch((error) => {
            this.accessToken = '';
        });
        this.config = _config;
    }
    createHeader() {
        return new Promise((resolve, reject) => {
            let Authorization = '';
            react_native_1.AsyncStorage.getItem('token_type')
                .then((tokenType) => {
                Authorization += tokenType;
                return react_native_1.AsyncStorage.getItem('token');
            })
                .then((token) => {
                Authorization += ' ' + token;
                resolve(Object.assign({}, this.config, { headers: {
                        Authorization: Authorization,
                    } }));
            })
                .catch((error) => {
                Authorization = '';
                resolve(Object.assign({}, this.config, { headers: {
                        Authorization: Authorization,
                    } }));
            });
        });
    }
    delete(url) {
        return new Promise((resolve, reject) => {
            this.createHeader()
                .then((header) => {
                resolve(axios_1.default.delete(url, header));
            });
        });
    }
    get(url) {
        // return axios.get ( url, this.createHeader () );
        return new Promise((resolve, reject) => {
            this.createHeader()
                .then((header) => {
                resolve(axios_1.default.get(url, header));
            });
        });
    }
    post(url, data) {
        // return axios.post ( url, data, this.createHeader () );
        return new Promise((resolve, reject) => {
            this.createHeader()
                .then((header) => {
                resolve(axios_1.default.post(url, data, header));
            });
        });
    }
    put(url, data) {
        // return axios.put ( url, data, this.createHeader () );
        return new Promise((resolve, reject) => {
            this.createHeader()
                .then((header) => {
                resolve(axios_1.default.put(url, data, header));
            });
        });
    }
}
exports.default = HttpCommunicator;
