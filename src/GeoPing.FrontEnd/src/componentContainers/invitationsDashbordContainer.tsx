import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IInvitationsDashbordContainer from '../componentProps/invitationsDashbordContainerProps';
import { InvitationsDashbordComponent } from '../components/InvitationsDashbordComponent';

class InvitationsDashbordContainer extends React.Component<IInvitationsDashbordContainer, any> {
  render() {
    return(
      <React.Fragment>
        <InvitationsDashbordComponent />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( InvitationsDashbordContainer );