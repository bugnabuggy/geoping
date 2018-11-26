// import IModalStateType from '../DTO/types/stateTypes/modalStateType';
// import { modalState } from '../state/modalState';
// import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../DTO/constantsForReducer/modal';
//
// export default function modalReducer( state: IModalStateType = modalState, action: any ) {
//   const reduceObject: any = {
//     [SHOW_MODAL_SHARE]: showModalShare,
//     [CLOSE_MODAL_SHARE]: closeModalShare,
//   };
//
//   return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
// }
//
// function showModalShare( state: IModalStateType, action: any ) {
//   return {
//     ...state,
//     isShowModalShare: !!action.checkListId,
//
//   };
// }
//
// function closeModalShare( state: IModalStateType, action: any ) {
//   const newState: IModalStateType = Object.assign ( {}, state, { isShowModalShare: action.isShow } );
//   return newState;
// }