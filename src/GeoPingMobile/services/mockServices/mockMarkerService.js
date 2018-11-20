"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockMarkerService {
    createNewMarker(marker) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('is added');
            }, 1000);
        });
    }
    deleteMarker(idCheckList, markerId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: idCheckList,
                });
            }, 1000);
        });
    }
    getAllMarkersForCheckList(idCheckList) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).points
                    .filter((item) => item.idList === idCheckList));
            }, 1000);
        });
    }
    updateMarker(marker) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('is Update');
            }, 1000);
        });
    }
    getMarkersForListAndUser(idList, idUser) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).check_in_statistics_point
                    .filter((item) => item.idList === idList && item.idUser === idUser));
            }, 1000);
        });
    }
    getChecksStatisticsForList(listId, userId, dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('is Update');
            }, 1000);
        });
    }
}
exports.default = MockMarkerService;
