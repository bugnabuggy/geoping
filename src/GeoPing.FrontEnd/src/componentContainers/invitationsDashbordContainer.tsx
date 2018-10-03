import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IInvitationsDashbordContainer from '../componentProps/invitationsDashbordContainerProps';
import { InvitationsDashbordComponent } from '../components/InvitationsDashbordComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class InvitationsDashbordContainer extends React.Component<IInvitationsDashbordContainer, any> {
  render() {
    return (
      <React.Fragment>
        <div className="dashboard-invitations-title">
          <h4>
            Invitations
          </h4>
          <div className="dashboard-table-icon cursor-pointer">
            <FontAwesomeIcon icon="filter" />
          </div>
        </div>
        <InvitationsDashbordComponent/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {}, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( InvitationsDashbordContainer );