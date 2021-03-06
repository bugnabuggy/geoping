import ICheckListStateType from '../types/stateTypes/checkListStateType';

export const checkListState: ICheckListStateType = {
  // id: '',
  isShowModal: false,
  // name: '',
  isEditing: false,
  showFilterCheckList: false,
  isMyGeoPosition: false,
  // description: '',
  // isPublic: false,
  // ownerId: '',
  // periodFrom: '',
  // periodTo: '',
  // rating: null,
  isGeoPointLoading: false,
  isCheckList: false,
  selectedGeoList: {
    id: '',
    name: '',
    description: '',
    isPublic: false,
    ownerId: '',
    periodFrom: '',
    periodTo: '',
    rating: null,
    created: '',
    edited: '',
  },
  checkLists: [],
  checkListPublic: [],
  acceptedSharedLists: [],
  newSharedLists: [],
  checkInLists: [],
  checkListPublicInfo: {
    id: '',
    name: '',
    rating: null,
    subscribersNumber: null,
    ownerName: '',
    createDate: '',
    description: '',
    editDate: '',
    finishersNumber: null,
    isOfficial: false,
    ownerId: '',
    publishDate: '',
  },
};
