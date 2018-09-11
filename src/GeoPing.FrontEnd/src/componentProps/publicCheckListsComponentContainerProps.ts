import IPublicCheckListItemProps from './publicCheckListItemProps';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IPublicCheckListsComponentContainerProps {
  publicListItem: Array<IPublicCheckListItemProps>;
  countPages: number;
  actionPage: number;

  changePagination: ( numberPage: string ) => ( dispatch: IDispatchFunction ) => void;
}
