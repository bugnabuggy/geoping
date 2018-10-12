import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IInvitationsDashbordContainer from '../componentContainerProps/invitationsDashbordContainerProps';
import { InvitationsDashbordComponent } from '../components/InvitationsDashbordComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { filterInvitations, closeFilterInvitations } from '../actions/invitationsAction';
import { ModalInvitationsFilterComponent } from '../components/modalComponents/modalInvitationsFilterComponent';

class InvitationsDashbordContainer extends React.Component<IInvitationsDashbordContainer, any> {
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
            <FontAwesomeIcon icon="filter" />
          </div>
        </div>
        <InvitationsDashbordComponent/>
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
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      filterInvitations,
      closeFilterInvitations
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( InvitationsDashbordContainer );