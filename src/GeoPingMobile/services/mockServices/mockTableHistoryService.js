"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockTableHistoryService {
    getHistory() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).dashboard_history_table || []);
            }, 1000);
        });
    }
    addRecordForHistory(idUser, historyData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let localDB = JSON.parse(sessionStorage.getItem('localDB'));
                localDB.dashboard_history_table = [
                    ...localDB.dashboard_history_table,
                    historyData
                ];
                sessionStorage.setItem('localDB', JSON.stringify(localDB));
                resolve('ok');
            }, 1000);
        });
    }
}
exports.default = MockTableHistoryService;
