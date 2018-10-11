import IPublicCheckListItemProps from '../../../componentProps/publicCheckListItemProps';

export default interface IPublicCheckListType {
  checkLists: Array<IPublicCheckListItemProps>;
  pageNumber: number;
  countLists: number;
  contPages: number;
  filterName: string;
  filterUser: string;
  filterSubscribers: number;
}