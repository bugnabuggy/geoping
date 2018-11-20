"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dashboardFiltersMockService(filterName) {
    return new Promise((resolve, reject) => {
        if (filterName === 'filterHistory') {
            resolve({ isFiltered: true });
        }
        if (filterName === 'filterCheckLists') {
            resolve({ isFiltered: true });
        }
        if (filterName === 'filterInvitations') {
            resolve({ isFiltered: true });
        }
    });
}
exports.dashboardFiltersMockService = dashboardFiltersMockService;
