export const endpointBaseUrl: string = process.env.REACT_APP_API_BASE_URL;

export const getToken: string = `${endpointBaseUrl}/connect/token`;

/* endpoints for geo lists */
export const getAllGeoLists: string = `${endpointBaseUrl}/api/geolist`;
export const getGeoListForId: string = `${endpointBaseUrl}/api/geolist/%id%`;
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
