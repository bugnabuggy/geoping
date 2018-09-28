import * as React from 'react';
import { connect } from 'react-redux';
import { HeaderComponent } from '../components/headerComponent';
import IHeaderComponentContainerProps from '../componentProps/headerComponentProps/headerComponentContainerProps';
import { bindActionCreators } from 'redux';
import { editRoute } from '../actions/headerAction';
import { authorizationUser, signOutUser } from '../actions/userAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class HeaderComponentContainer extends React.Component<IHeaderComponentContainerProps, any> {

  componentDidUpdate( prevProps: IHeaderComponentContainerProps ) {
    if ( this.props.routeKey !== this.props.location.pathname ) {
      this.props.editRoute ( this.props.location.pathname );
    }
  }

  render() {
    return (
      <React.Fragment>
        <HeaderComponent
          path={this.props.location.pathname}
          routeKey={this.props.routeKey}
          userAuthorization={this.props.userAuthorization}
          roleUser={this.props.roleUser}

          editRouteAction={this.props.editRoute}
          authorizationUser={this.props.authorizationUser}
          signOutUser={this.props.signOutUser}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    location: state.router.location,
    routeKey: state.header.routeKey,
    userAuthorization: state.user.authorized,
    roleUser: state.user.roleUser,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    editRoute,
    authorizationUser,
    signOutUser,
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( HeaderComponentContainer );