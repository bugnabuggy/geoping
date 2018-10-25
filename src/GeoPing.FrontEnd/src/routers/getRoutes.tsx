import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Routes from './routesComponent';
import IinitialStateType from '../types/stateTypes/initialStateType';
import IGetRoutesProps from '../componentProps/routerProps/getRoutesProps';
import { authorizationUserFlag } from '../actions/userAction';
import { buildEnvironment, environments, getBuildEnvironment } from '../services/environmentsServiceLocator';
import { EBuildEnvironment } from '../enums/environment';
import StaticStorage from '../services/staticStorage';

class GetRoutes extends React.Component<IGetRoutesProps, any> {
  authorized = () => {
    if ( !!localStorage.getItem( 'token' ) ) {
      if ( localStorage.getItem( 'token' ) === '4be0643f-1d98-573b-97cd-ca98a65347dd' ) {
        getBuildEnvironment( EBuildEnvironment.Test );
        StaticStorage.serviceLocator = environments.get( buildEnvironment );
      }
      if ( !this.props.authorized ) {
        this.props.authorizationUserFlag( true );
      }
    } else {
      if ( this.props.authorized ) {
        this.props.authorizationUserFlag( false );
      }
    }
  };

  componentDidUpdate( prevProps: IGetRoutesProps ) {
    this.authorized();
  }
  constructor(props: IGetRoutesProps) {
    super(props);
    this.authorized();
  }

  render() {
    return (
      <React.Fragment>
        <Routes
          authorized={!!localStorage.getItem( 'token' )}
          roleUser={this.props.roleUser}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    authorized: state.user.authorized,
    location: state.router.location.pathname,
    roleUser: state.user.roleUser,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      authorizationUserFlag,
    },
    dispath );

const Routers: any = withRouter( connect<any, any, any>( mapStateToProps, mapDispatchToProps )( GetRoutes ) );

export function getRoutes() {
  return <Routers/>;
}
