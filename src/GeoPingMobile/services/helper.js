"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const routes_1 = require("../constants/routes");
function createNotification(message, notificationType) {
    const newNotification = {
        message,
        type: notificationType,
        id: uuid_1.v4(),
    };
    return newNotification;
}
exports.createNotification = createNotification;
function sortAsc(itemOne, itemTwo) {
    if (itemOne < itemTwo) {
        return -1;
    }
    else if (itemOne === itemTwo) {
        return 0;
    }
    return 1;
}
exports.sortAsc = sortAsc;
function sortDesc(itemOne, itemTwo) {
    if (itemOne > itemTwo) {
        return -1;
    }
    else if (itemOne === itemTwo) {
        return 0;
    }
    return 1;
}
exports.sortDesc = sortDesc;
function checkLocation(location, callbackRedirect) {
    const authorizedPath = [
        routes_1.dashboardUrl,
        routes_1.profileUrl,
        routes_1.checkListUrl,
        routes_1.checkInUrl,
        routes_1.checkInStatistics,
        routes_1.adminPrefixUrl,
        routes_1.adminDashboardUrl,
        routes_1.adminAllUsersUrl,
        routes_1.adminAllCheckLists
    ];
    const redirect = authorizedPath.find((path) => {
        const reg = new RegExp(`${path.replace(/:\w+/g, '[a-z0-9-]+')}`, 'g');
        return reg.test(location);
    });
    if (redirect) {
        sessionStorage.setItem('url_for_redirect', location);
        callbackRedirect(true);
    }
}
exports.checkLocation = checkLocation;
