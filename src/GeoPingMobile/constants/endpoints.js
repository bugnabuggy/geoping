"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointBaseUrl = 'https://api.dev.geoping.info';
exports.getToken = `${exports.endpointBaseUrl}/connect/token`;
exports.registration = `${exports.endpointBaseUrl}/account/register`;
exports.confirmEmail = `${exports.endpointBaseUrl}/account/confirm-email?UserId=%userId%&Token=%token%`;
exports.sendLoginOrEmail = `${exports.endpointBaseUrl}/account/reset-password?LoginOrEmail=%login%`;
exports.resetPassword = `${exports.endpointBaseUrl}/account/confirm-reset?UserId=%id%&Token=%token%&NewPassword=%pass%`;
/* endpoints for geo lists */
exports.getAllGeoLists = `${exports.endpointBaseUrl}/api/geolist`;
exports.getGeoListForId = `${exports.endpointBaseUrl}/api/geolist/%id%`;
exports.getAllPublicGeoLosts = `${exports.endpointBaseUrl}/api/geolist/public`;
exports.createNewGeoList = `${exports.endpointBaseUrl}/api/geolist`;
exports.updateGeoList = `${exports.endpointBaseUrl}/api/geolist/%id%`;
exports.removeCollectionGeoLists = `${exports.endpointBaseUrl}/api/geolist/%id%`;
exports.removeGeoList = `${exports.endpointBaseUrl}/api/geolist/%id%`;
exports.getUsersHasAccess = `${exports.endpointBaseUrl}/api/sharing/user/%id%`;
/* endpoints for geo points */
exports.getGeoPointsForList = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint`;
exports.getGeoPointForList = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
exports.createGeoNewPoint = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint`;
exports.updateGeoPoint = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
exports.removeCollectionGeoPoints = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
exports.removeGeoPoint = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
/* endpoints for user profile */
exports.loadUserProfile = `${exports.endpointBaseUrl}/account/profile`;
exports.updateUserProfile = `${exports.endpointBaseUrl}/account/profile`;
exports.changeUserPassword = `${exports.endpointBaseUrl}/account/change-password`;
// export const upgradeAccount: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
exports.loadUserData = `${exports.endpointBaseUrl}/account/profile/short`;
exports.updateAvatar = `${exports.endpointBaseUrl}/account/profile/avatar`;
/* endpoints for check in */
exports.addCheckIn = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%/check`;
exports.getCheckInForUserAndGivenPoint = `${exports.endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%/check`;
exports.getAllChecksInForUserAndGivenList = `${exports.endpointBaseUrl}/api/geolist/%listid%/check`;
exports.getChecksStatisticsForList = `${exports.endpointBaseUrl}/api/geolist/%listid%/statistics`;
/* endpoints for check in statistics */
exports.getGeoListStatistics = `${exports.endpointBaseUrl}/api/geolist/%listid%/statistics`;
exports.getUserAccessedToList = `${exports.endpointBaseUrl}/api/Geolist/%listid%/sharing/allowed-users`;
