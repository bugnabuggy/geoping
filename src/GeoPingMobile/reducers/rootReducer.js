"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_redux_1 = require("react-router-redux");
const redux_form_1 = require("redux-form");
const redux_persist_1 = require("redux-persist");
const checkListReducer_1 = __importDefault(require("./checkListReducer"));
const userReducer_1 = __importDefault(require("./userReducer"));
const profileReducer_1 = __importDefault(require("./profileReducer"));
const tableUsersReducer_1 = __importDefault(require("./tableUsersReducer"));
const checkinStatisticsReducer_1 = __importDefault(require("./checkinStatisticsReducer"));
const checkinReducer_1 = __importDefault(require("./checkinReducer"));
const headerReducer_1 = __importDefault(require("./headerReducer"));
const googleMapReducer_1 = __importDefault(require("./googleMapReducer"));
const tableHistoryReducer_1 = __importDefault(require("./tableHistoryReducer"));
const publicCheckListReducer_1 = __importDefault(require("./publicCheckListReducer"));
const notificationsReducer_1 = __importDefault(require("./notificationsReducer"));
const allUsersFilterReducer_1 = __importDefault(require("./allUsersFilterReducer"));
const allUsersTableReducer_1 = __importDefault(require("./allUsersTableReducer"));
const allChecklistFilterReducer_1 = __importDefault(require("./allChecklistFilterReducer"));
const invitationsReducer_1 = __importDefault(require("./invitationsReducer"));
const myCheckListReducer_1 = __importDefault(require("./myCheckListReducer"));
const sharedCheckListReducer_1 = __importDefault(require("./sharedCheckListReducer"));
const windowReduser_1 = __importDefault(require("./windowReduser"));
const storage_1 = __importDefault(require("redux-persist/es/storage"));
const persistConfig = {
    key: 'root',
    storage: storage_1.default,
};
function createReducer(injectedReducers) {
    return redux_persist_1.persistCombineReducers(persistConfig, Object.assign({ form: redux_form_1.reducer, allUsersFilter: allUsersFilterReducer_1.default, allUsersTable: allUsersTableReducer_1.default, checkList: checkListReducer_1.default, user: userReducer_1.default, profile: profileReducer_1.default, tableUser: tableUsersReducer_1.default, myCheckList: myCheckListReducer_1.default, sharedCheckList: sharedCheckListReducer_1.default, checkinStatistics: checkinStatisticsReducer_1.default, checkin: checkinReducer_1.default, header: headerReducer_1.default, tableHistory: tableHistoryReducer_1.default, googleMap: googleMapReducer_1.default, publicCheckList: publicCheckListReducer_1.default, notifications: notificationsReducer_1.default, invitations: invitationsReducer_1.default, allChecklistFilter: allChecklistFilterReducer_1.default, router: react_router_redux_1.routerReducer, window: windowReduser_1.default }, injectedReducers));
}
exports.default = createReducer;
