import IPublicCheckListItemProps from '../componentProps/publicCheckListItemProps';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IPublicCheckListsComponentContainerProps {
  publicListItem: Array<IPublicCheckListItemProps>;
  countPages: number;
  actionPage: number;

  loadPublicLists: () => ( dispatch: IDispatchFunction ) => void;
  changePagination: ( numberPage: string ) => ( dispatch: IDispatchFunction ) => void;
}
