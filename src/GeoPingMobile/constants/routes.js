"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* url for all users */
exports.baseUrl = '/';
exports.publicCheckListUrl = `${exports.baseUrl}public_check_list`;
exports.notFoundUrl = `${exports.baseUrl}not_found`;
exports.emailConfirm = `${exports.baseUrl}email_confirm/:idUser/:token`;
exports.token = `${exports.baseUrl}token`;
exports.tokenError = `${exports.baseUrl}token_error`;
/* url for not authorize user */
exports.loginUrl = `${exports.baseUrl}login`;
exports.registerUrl = `${exports.baseUrl}register`;
exports.resetPassword = `${exports.baseUrl}reset_password/:idUser?/:token?`;
/* url for authorize user */
exports.dashboardUrl = `${exports.baseUrl}dashboard`;
exports.profileUrl = `${exports.baseUrl}profile`;
exports.checkListUrl = `${exports.baseUrl}check_list/([a-z0-9-]+)`;
exports.checkInUrl = `${exports.baseUrl}check_in`;
exports.checkInStatistics = `${exports.baseUrl}check_in_statistics/:listId`;
exports.logOutUrl = `${exports.baseUrl}log_out`;
/* url for admin role user */
exports.adminPrefixUrl = 'admin/';
exports.adminDashboardUrl = `${exports.baseUrl + exports.adminPrefixUrl}dashboard`;
exports.adminAllUsersUrl = `${exports.baseUrl + exports.adminPrefixUrl}all_users`;
exports.adminAllCheckLists = `${exports.baseUrl + exports.adminPrefixUrl}all_check_lists`;
