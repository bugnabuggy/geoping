import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { IGeoListPublickDTO } from '../DTO/geoListDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import IGeoPoint from '../DTO/geoPointDTO';

export default interface IPublicListInfoContainerProps {
  listId: string;
  checkListInfo: IGeoListPublickDTO;
  googleMap: IGoogleMapStateType;

  loadPublicCheckListInfo: ( listId: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
}