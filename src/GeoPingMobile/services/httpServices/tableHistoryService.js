"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
class TableHistoryService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    getHistory() {
        return this.communicator.get(endpoints_1.endpointBaseUrl + '/history');
    }
    addRecordForHistory(idUser, historyData) {
        return new Promise(resolve => '');
    }
}
exports.default = TableHistoryService;
