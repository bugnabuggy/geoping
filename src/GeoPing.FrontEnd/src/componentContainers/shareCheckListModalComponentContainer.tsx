import * as React from 'react';
import { ShareCheckListModalComponent } from '../components/modalComponents/checklist/shareCheckListModalComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalShare } from '../actions/myCheckListsAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import IShareCheckListModalComponentContainerProps
  from '../componentContainerProps/shareCheckListModalComponentContainerProps';
import {
  clearAutocompleteListUsers,
  clearSharedCheckList, getAutocompletedListUsers,
  loadUsersForShared,
  providePublicAccess,
  sendAccessUsersForCheckList
} from '../actions/sharedCheckListAction';
import { updateCheckList } from '../actions/checkListAction';

class ShareCheckListModalComponentContainer extends React.Component<IShareCheckListModalComponentContainerProps, any> {
  render() {
    return this.props.myCheckList.isShowModalShare ?
      (
        <ShareCheckListModalComponent
          myCheckList={this.props.myCheckList}
          sharedCheckList={this.props.sharedCheckList}
          checkList={this.props.checkList}

          closeModalShare={this.props.closeModalShare}
          loadUsersForShared={this.props.loadUsersForShared}
          clearSharedCheckList={this.props.clearSharedCheckList}
          sendAccessUsersForCheckList={this.props.sendAccessUsersForCheckList}
          providePublicAccess={this.props.providePublicAccess}
          updateCheckList={this.props.updateCheckList}
          getAutocompletedListUsers={this.props.getAutocompletedListUsers}
          clearAutocompleteListUsers={this.props.clearAutocompleteListUsers}
        />
      )
      :
      null;
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    myCheckList: state.myCheckList,
    sharedCheckList: state.sharedCheckList,
    checkList: state.checkList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      closeModalShare,
      loadUsersForShared,
      clearSharedCheckList,
      sendAccessUsersForCheckList,
      providePublicAccess,
      updateCheckList,
      getAutocompletedListUsers,
      clearAutocompleteListUsers,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( ShareCheckListModalComponentContainer );