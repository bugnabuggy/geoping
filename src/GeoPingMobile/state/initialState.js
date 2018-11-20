"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsersFilterState_1 = require("./allUsersFilterState");
const checkinState_1 = require("./checkinState");
const checkinStatisticsState_1 = require("./checkinStatisticsState");
const checkListState_1 = require("./checkListState");
const profileState_1 = require("./profileState");
const tableUserState_1 = require("./tableUserState");
const userState_1 = require("./userState");
const headerState_1 = require("./headerState");
const googleMapState_1 = require("./googleMapState");
const tableHistoryState_1 = require("./tableHistoryState");
const publickCheckListState_1 = require("./publickCheckListState");
const notificationsState_1 = require("./notificationsState");
const allUsersTableState_1 = require("./allUsersTableState");
const myCheckListState_1 = require("./myCheckListState");
const invitationsState_1 = require("./invitationsState");
const sharedCheckListState_1 = require("./sharedCheckListState");
const windowState_1 = require("./windowState");
const initialState = {
    form: {},
    allUsersFilter: allUsersFilterState_1.allUsersFilterState,
    allUsersTable: allUsersTableState_1.allUsersTableState,
    checkin: checkinState_1.checkinState,
    myCheckList: myCheckListState_1.myCheckList,
    sharedCheckList: sharedCheckListState_1.sharedCheckList,
    checkinStatistics: checkinStatisticsState_1.checkinStatisticsState,
    checkList: checkListState_1.checkListState,
    profile: profileState_1.profileState,
    tableUser: tableUserState_1.tableUserState,
    user: userState_1.userState,
    header: headerState_1.headerState,
    tableHistory: tableHistoryState_1.tableHistoryState,
    googleMap: googleMapState_1.googleMapState,
    publicCheckList: publickCheckListState_1.publicCheckListState,
    notifications: notificationsState_1.notificationState,
    invitations: invitationsState_1.invitationsState,
    router: {},
    window: windowState_1.windowState,
};
exports.default = initialState;
