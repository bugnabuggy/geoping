import IPublicCheckListItemProps from './publicCheckListItemProps';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IPublicCheckListsComponentContainerProps {
  publicListItem: Array<IPublicCheckListItemProps>;
  countPages: number;
  actionPage: number;

  loadPublicLists: () => ( dispatch: IDispatchFunction ) => void;
  changePagination: ( numberPage: string ) => ( dispatch: IDispatchFunction ) => void;
}
