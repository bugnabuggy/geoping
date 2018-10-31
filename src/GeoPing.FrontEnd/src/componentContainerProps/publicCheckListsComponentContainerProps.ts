import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { IGeoListPublickDTO } from '../DTO/geoListDTO';

export default interface IPublicCheckListsComponentContainerProps {
  publicListItem: Array<IGeoListPublickDTO>;
  countPages: number;
  actionPage: number;

  loadPublicLists: () => ( dispatch: IDispatchFunction ) => void;
  changePagination: ( numberPage: string ) => ( dispatch: IDispatchFunction ) => void;
}
