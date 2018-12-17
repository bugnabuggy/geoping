import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IPublicListInfoContainerProps {
  listId: string;

  loadPublicCheckListInfo: ( listId: string ) => ( dispatch: IDispatchFunction ) => void;
}