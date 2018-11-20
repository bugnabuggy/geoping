"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
const helper_1 = require("../helper");
const uuid_1 = require("uuid");
class MarkerService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    createNewMarker(marker) {
        return new Promise((resolve, reject) => {
            const idList = marker.idList;
            const GeoPoint = {
                Name: marker.name,
                Description: marker.description,
                Longitude: marker.lng,
                Latitude: marker.lat,
                Radius: marker.radius,
                Address: marker.description,
            };
            this.communicator.post(endpoints_1.createGeoNewPoint.replace('%listid%', idList), GeoPoint)
                .then((response) => {
                const tempMarker = helper_1.getDataFromResponse(response);
                const geoPoint = {
                    id: tempMarker.id,
                    name: tempMarker.name,
                    radius: tempMarker.radius,
                    lat: Number(tempMarker.latitude),
                    lng: Number(tempMarker.longitude),
                    description: tempMarker.description,
                    idList: tempMarker.listId,
                    idForMap: marker.idForMap,
                };
                resolve(geoPoint);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    deleteMarker(idCheckList, markerId) {
        return new Promise((resolve, reject) => {
            this.communicator.delete(endpoints_1.removeGeoPoint.replace('%listid%', idCheckList).replace('%id%', markerId))
                .then((response) => {
                if (response.data.success) {
                    resolve();
                }
                else {
                    reject({ message: 'failed to delete point' });
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getAllMarkersForCheckList(idCheckList) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getGeoPointsForList.replace('%listid%', idCheckList))
                .then((response) => {
                const markers = helper_1.getDataFromResponse(response).map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        radius: item.radius,
                        lat: Number(item.latitude),
                        lng: Number(item.longitude),
                        description: item.description,
                        idList: item.listId,
                        idForMap: uuid_1.v4(),
                    };
                });
                resolve(markers);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updateMarker(marker) {
        return new Promise((resolve, reject) => {
            const idList = marker.idList;
            const GeoPoint = {
                Name: marker.name,
                Description: marker.description,
                Longitude: marker.lng,
                Latitude: marker.lat,
                Radius: marker.radius,
                Address: marker.description,
            };
            this.communicator.put(endpoints_1.updateGeoPoint.replace('%listid%', idList).replace('%id%', marker.id), GeoPoint)
                .then((response) => {
                const tempMarker = helper_1.getDataFromResponse(response);
                const geoPoint = {
                    id: tempMarker.id,
                    name: tempMarker.name,
                    radius: tempMarker.radius,
                    lat: Number(tempMarker.latitude),
                    lng: Number(tempMarker.longitude),
                    description: tempMarker.description,
                    idList: tempMarker.listId,
                    idForMap: marker.idForMap,
                };
                resolve(geoPoint);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getMarkersForListAndUser(idList, idUser) {
        // return this.communicator.get( '' );
        return new Promise(resolve => '');
    }
    getChecksStatisticsForList(listId, userId, dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getChecksStatisticsForList.replace('%listid%', listId) +
                `/?UserId=${userId}&DatePeriodFrom=${dateFrom}&DatePeriodTo=${dateTo}`)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = MarkerService;
