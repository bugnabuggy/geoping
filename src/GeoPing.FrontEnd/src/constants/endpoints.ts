export const endpointBaseUrl: string = process.env.REACT_APP_API_BASE_URL;

export const getToken: string = `${endpointBaseUrl}/connect/token`;
export const registration: string = `${endpointBaseUrl}/account/register`;
export const confirmEmail: string = `${endpointBaseUrl}/account/confirm-email?UserId=%userId%&Token=%token%`;
export const sendLoginOrEmail: string = `${endpointBaseUrl}/account/reset-password`;
export const resetPassword: string =
  `${endpointBaseUrl}/account/confirm-reset?UserId=%id%&Token=%token%`;

/* endpoints for geo lists */
export const getAllGeoLists: string = `${endpointBaseUrl}/api/geolist`;
export const getGeoListForId: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const getAllPublicGeoLosts: string = `${endpointBaseUrl}/api/publiclists`;
export const createNewGeoList: string = `${endpointBaseUrl}/api/geolist`;
export const updateGeoList: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const removeCollectionGeoLists: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const removeGeoList: string = `${endpointBaseUrl}/api/geolist/%id%`;
// export const getUsersHasAccess: string = `${endpointBaseUrl}/api/sharing/%listid%`;

/* endpoints for geo points */
export const getGeoPointsForList: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint`;
export const getGeoPointForList: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
export const createGeoNewPoint: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint`;
export const updateGeoPoint: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
export const removeCollectionGeoPoints: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
export const removeGeoPoint: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;

/* endpoints for user profile */
export const loadUserProfile: string = `${endpointBaseUrl}/account/profile`;
export const updateUserProfile: string = `${endpointBaseUrl}/account/profile`;
export const changeUserPassword: string = `${endpointBaseUrl}/account/change-password`;
// export const upgradeAccount: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%`;
export const loadUserData: string = `${endpointBaseUrl}/account/profile/short`;
export const updateAvatar: string = `${endpointBaseUrl}/account/profile/avatar`;

/* endpoints for check in */
export const addCheckIn: string = `${endpointBaseUrl}/api/check/geopoint/%id%`;
export const getCheckInForUserAndGivenPoint: string = `${endpointBaseUrl}/api/check/geopoint/%id%`;
export const getAllChecksInForUserAndGivenList: string = `${endpointBaseUrl}/api/check/geolist/%listid%`;
export const getChecksStatisticsForList: string = `${endpointBaseUrl}/api/geolist/%listid%/statistics`;
export const getGeoListMyAndHasAccess: string = `${endpointBaseUrl}/api/geolist/allowed`;

/* endpoints for check in statistics */
export const getGeoListStatistics: string = `${endpointBaseUrl}/api/geolist/%listid%/statistics`;
export const getUserAccessedToList: string = `${endpointBaseUrl}/api/statistics/geolist/%listid%/users`;
export const getCheckInStatisticsForListByFilter: string = `${endpointBaseUrl}/api/statistics/geolist/%listid%`;
export const getFreeChecksStatisticsByFilter: string = `${endpointBaseUrl}/api/statistics/geolist?`;

/* endpoints for tables */
export const getHistory: string = `${endpointBaseUrl}/api/statistics/history`;

/* endpoints for sharing */
export const inviteUsersToShareList: string = `${endpointBaseUrl}/api/sharing/%listid%`;
export const getAllNewSharedLists: string = `${endpointBaseUrl}/api/sharing/new`;
export const getAllAcceptedSharedList: string = `${endpointBaseUrl}/api/sharing/accepted`;
export const deleteListSharing: string = `${endpointBaseUrl}/api/sharing/%sharingId%`;
export const cancelAcceptListSharing: string = `${endpointBaseUrl}/api/sharing/invitation/%sharingId%`;
export const getAllUsersForListShared: string = `${endpointBaseUrl}/api/sharing/%listid%/allowed-users`;
export const acceptListSharingInvite: string = `${endpointBaseUrl}/api/sharing/invitation/%sharingId%`;
export const getAutocompletedListUsers: string = `${endpointBaseUrl}/api/sharing/autocomplete?query=%query%`;
export const getInfoAboutToken: string = `${endpointBaseUrl}/api/token/%token%`;
export const removeToken: string = `${endpointBaseUrl}/api/token/%token%`;

/* endpoints utility */
export const getCountries: string = `${endpointBaseUrl}/api/utility/countries`;
export const getTimeZones: string = `${endpointBaseUrl}/api/utility/timezones`;

/* endpoints public lists */
export const getCertainPublicList: string = `${endpointBaseUrl}/api/publiclists/%listid%`;
export const getPointsForPublicList: string = `${endpointBaseUrl}/api/publiclists/%listid%/geopoints`;