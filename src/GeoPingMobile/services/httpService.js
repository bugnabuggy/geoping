"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.get = (url) => {
    return axios_1.default.get(url);
};
exports.post = (url, data) => {
    return axios_1.default.post(url, data);
};
class HttpCommunicator {
    constructor(_config = {}) {
        this.accessToken = localStorage.getItem('token') || '';
        this.config = _config;
    }
    createHeader() {
        return Object.assign({}, this.config, { headers: !!localStorage.getItem('token') ?
                {
                    Authorization: localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
                }
                :
                    {} });
    }
    delete(url) {
        return axios_1.default.delete(url, this.createHeader());
    }
    get(url) {
        return axios_1.default.get(url, this.createHeader());
    }
    post(url, data) {
        return axios_1.default.post(url, data, this.createHeader());
    }
    put(url, data) {
        return axios_1.default.put(url, data, this.createHeader());
    }
}
exports.default = HttpCommunicator;
