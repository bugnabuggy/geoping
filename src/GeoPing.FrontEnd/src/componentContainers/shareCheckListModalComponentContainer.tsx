import * as React from 'react';
import { ShareCheckListModalComponent } from '../components/modalComponents/checklist/shareCheckListModalComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalShare } from '../actions/myCheckListsAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import IShareCheckListModalComponentContainerProps
  from '../componentContainerProps/shareCheckListModalComponentContainerProps';
import {
  clearSharedCheckList,
  loadUsersForShared, providePublicAccess,
  sendAccessUsersForCheckList
} from '../actions/sharedCheckListAction';

class ShareCheckListModalComponentContainer extends React.Component<IShareCheckListModalComponentContainerProps, any> {
  render() {
    return this.props.myCheckList.isShowModalShare ?
      (
        <ShareCheckListModalComponent
          myCheckList={this.props.myCheckList}
          sharedCheckList={this.props.sharedCheckList}

          closeModalShare={this.props.closeModalShare}
          loadUsersForShared={this.props.loadUsersForShared}
          clearSharedCheckList={this.props.clearSharedCheckList}
          sendAccessUsersForCheckList={this.props.sendAccessUsersForCheckList}
          providePublicAccess={this.props.providePublicAccess}
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
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( ShareCheckListModalComponentContainer );