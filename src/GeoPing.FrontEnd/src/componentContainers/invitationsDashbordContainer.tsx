import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IInvitationsDashbordContainer from '../componentContainerProps/invitationsDashbordContainerProps';
import { InvitationsDashbordComponent } from '../components/InvitationsDashbordComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IinitialStateType from '../types/stateTypes/initialStateType';
import {
  acceptListSharingInvite,
  cancelAcceptNewSharingList,
  closeFilterInvitations,
  deleteListSharing,
  filterInvitations,
  loadAllAcceptedSharedLists,
  loadAllNewSharedList
} from '../actions/invitationsAction';
import { ModalInvitationsFilterComponent } from '../components/modalComponents/modalInvitationsFilterComponent';

class InvitationsDashbordContainer extends React.Component<IInvitationsDashbordContainer, any> {
  componentDidMount(): void {
    this.props.loadAllNewSharedList();
    this.props.loadAllAcceptedSharedLists();
  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-invitations-title">
          <h4>
            Invitations
          </h4>
          <div
            className="dashboard-table-icon cursor-pointer"
            onClick={this.props.filterInvitations}
          >
            <FontAwesomeIcon icon="filter"/>
          </div>
        </div>
        <InvitationsDashbordComponent
          checkList={this.props.checkList}
          invitations={this.props.invitations}

          acceptListSharingInvite={this.props.acceptListSharingInvite}
          cancelAcceptNewSharingList={this.props.cancelAcceptNewSharingList}
        />
        <ModalInvitationsFilterComponent
          show={this.props.show}

          closeFilterInvitations={this.props.closeFilterInvitations}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    show: state.invitations.showInvitationsFilter,
    checkList: state.checkList,
    invitations: state.invitations,
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      filterInvitations,
      closeFilterInvitations,
      loadAllNewSharedList,
      loadAllAcceptedSharedLists,
      deleteListSharing,
      cancelAcceptNewSharingList,
      acceptListSharingInvite,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( InvitationsDashbordContainer );