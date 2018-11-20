import IGeoPoint from '../../DTO/geoPointDTO';

export default interface IMarkerServiceType {
  getAllMarkersForCheckList: ( idCheckList: string ) => Promise<any>;
  getMarkersForListAndUser: ( idList: string, idUser: string ) => Promise<any>;

  createNewMarker: ( marker: IGeoPoint ) => Promise<any>;

  deleteMarker: ( idCheckList: string, markerId: string ) => Promise<any>;

  updateMarker: ( marker: IGeoPoint ) => Promise<any>;

  getChecksStatisticsForList: ( listId: string, userId: string, dateFrom: string, dateTo: string ) => Promise<any>;
}
