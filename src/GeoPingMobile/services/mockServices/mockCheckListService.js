"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class MockCheckListService {
    createMyCheckList(nameCheckList) {
        return new Promise((resolve, reject) => {
            const newCheckList = {
                name: nameCheckList,
                description: '',
                isPublic: false,
                edited: '',
                created: new Date().toString(),
                id: uuid_1.v4(),
                ownerId: JSON.parse(sessionStorage.getItem('localDB')).ownerId,
                periodFrom: '',
                periodTo: '',
                rating: null,
            };
            setTimeout(() => {
                resolve(newCheckList);
            }, 1000);
        });
    }
    deleteMyCheckList(idCheckLIst) {
        return new Promise((resolve, reject) => {
            resolve('Ok');
        });
    }
    loadAllMyCheckLists() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).dashboard_my_check_lists);
            }, 1000);
        });
    }
    loadMyCheckList(idCheckList) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).my_check_list.find((item) => item.id === idCheckList));
            }, 1000);
        });
    }
    loadPublicCheckLists() {
        return new Promise((resolve, reject) => {
            resolve('loadPublicCheckLists');
        });
    }
    updateMyCheckList(idCheckList, checkList) {
        return new Promise((resolve, reject) => {
            resolve('updateMyCheckList');
        });
    }
    updateNameMyCheckList(newNameCheckList) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(newNameCheckList);
            }, 1000);
        });
    }
    filterPublicCheckList(filters) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ds');
            }, 1000);
        });
    }
    loadUserWhoHasAccess(idList) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.parse(sessionStorage.getItem('localDB')).users_who_has_access
                    .filter((item) => item.idList === idList));
            }, 1000);
        });
    }
    sharedCheckListForUser(idList, emails) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const localDB = JSON.parse(sessionStorage.getItem('localDB'));
                localDB.users_who_has_access = [
                    ...localDB.users_who_has_access,
                    ...emails.map((name) => {
                        return {
                            id: uuid_1.v4(),
                            idList: idList,
                            name: name.email,
                            status: 'Pending',
                            invitationDate: 'date'
                        };
                    })
                ];
                sessionStorage.setItem('localDB', JSON.stringify(localDB));
                resolve(localDB.users_who_has_access.filter((item) => item.idList === idList));
            }, 1000);
        });
    }
    providePublicAccess(idList, isPublic) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const localDB = JSON.parse(sessionStorage.getItem('localDB'));
                localDB.dashboard_my_check_lists = [
                    ...localDB.dashboard_my_check_lists.map((item) => {
                        return item.id === idList ? Object.assign({}, item, { public: isPublic }) :
                            item;
                    })
                ];
                sessionStorage.setItem('localDB', JSON.stringify(localDB));
                resolve('ok');
            }, 1000);
        });
    }
    addCheckIn(idList, idPoint, data) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }
    getAllChecksForUserAndList(idList) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }
    getAllCheckForList(idList) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }
}
exports.default = MockCheckListService;
