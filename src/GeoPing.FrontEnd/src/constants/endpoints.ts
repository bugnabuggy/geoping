export const endpointBaseUrl: string = process.env.REACT_APP_API_BASE_URL;

export const getToken: string = `${endpointBaseUrl}/connect/token`;
export const registration: string = `${endpointBaseUrl}/account/register`;

/* endpoints for geo lists */
export const getAllGeoLists: string = `${endpointBaseUrl}/api/geolist`;
export const getGeoListForId: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const getAllPublicGeoLosts: string = `${endpointBaseUrl}/api/geolist/public`;
export const createNewGeoList: string = `${endpointBaseUrl}/api/geolist`;
export const updateGeoList: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const removeCollectionGeoLists: string = `${endpointBaseUrl}/api/geolist/%id%`;
export const removeGeoList: string = `${endpointBaseUrl}/api/geolist/%id%`;

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
export const addCheckIn: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%/check`;
export const getCheckInForUserAndGivenPoint: string = `${endpointBaseUrl}/api/geolist/%listid%/geopoint/%id%/check`;
export const getAllChecksInForUserAndGivenList: string = `${endpointBaseUrl}/api/geolist/%listid%/check`;
export const getChecksStatisticsForList: string = `${endpointBaseUrl}/api/geolist/%listid%/statistics`;

/* endpoints for check in statistics */
export const getGeoListStatistics: string = `${endpointBaseUrl}/api/geolist/%listid%/statistics`;
export const getUserAccessedToList: string = `${endpointBaseUrl}/api/Geolist/%listid%/sharing/allowed-users`;