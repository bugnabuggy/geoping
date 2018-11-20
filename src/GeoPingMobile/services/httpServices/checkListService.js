"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../staticStorage"));
const endpoints_1 = require("../../constants/endpoints");
const helper_1 = require("../helper");
class CheckListService {
    constructor() {
        this.communicator = staticStorage_1.default.serviceLocator.get('IHttpCommunicator');
    }
    createMyCheckList(nameCheckList) {
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.createNewGeoList, { Name: nameCheckList })
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    deleteMyCheckList(idCheckLIst) {
        return new Promise((resolve, reject) => {
            this.communicator.delete(endpoints_1.removeGeoList.replace('%id%', idCheckLIst))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    loadAllMyCheckLists() {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getAllGeoLists)
                .then((response) => {
                // resolve( response.data.data );
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    loadMyCheckList(idCheckLIst) {
        // return new Promise<any>( ( resolve: any, reject: any ) => {});
        return this.communicator.get(endpoints_1.getGeoListForId.replace('%id%', idCheckLIst));
    }
    loadPublicCheckLists() {
        // return this.communicator.get( '' );
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getAllPublicGeoLosts)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updateMyCheckList(idCheckList, checkList) {
        return new Promise((resolve, reject) => {
            this.communicator.put(endpoints_1.updateGeoList.replace('%id%', idCheckList), checkList)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
        // return this.communicator.put( updateGeoList.replace( '%id%', idCheckList ), checkList );
    }
    addCheckIn(idList, idPoint, data) {
        return new Promise((resolve, reject) => {
            this.communicator.post(endpoints_1.addCheckIn.replace('%listid%', idList).replace('%id%', idPoint), data)
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updateNameMyCheckList(newNameCheckList) {
        // return this.communicator.put( '', { newNameCheckList } );
        return new Promise(resolve => '');
    }
    filterPublicCheckList(filters) {
        return this.communicator.post(endpoints_1.endpointBaseUrl + '/publick', filters);
    }
    loadUserWhoHasAccess(idList) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getUsersHasAccess.replace('%id%', idList))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    sharedCheckListForUser(idList, emails) {
        return new Promise(resolve => '');
    }
    providePublicAccess(idList, isPublic) {
        return new Promise(resolve => '');
    }
    getAllChecksForUserAndList(idList) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getAllChecksInForUserAndGivenList.replace('%listid%', idList))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getAllCheckForList(idList) {
        return new Promise((resolve, reject) => {
            this.communicator.get(endpoints_1.getGeoListStatistics.replace('%listid%', idList))
                .then((response) => {
                resolve(helper_1.getDataFromResponse(response));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.default = CheckListService;
