import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Routes from './routesComponent';
import IinitialStateType from '../types/stateTypes/initialStateType';
import IGetRoutesProps from '../componentProps/routerProps/getRoutesProps';
import { authorizationUserFlag, loadUserData, redirectDashboard } from '../actions/userAction';
import { buildEnvironment, environments, getBuildEnvironment } from '../services/environmentsServiceLocator';
import { EBuildEnvironment } from '../enums/environment';
import StaticStorage from '../services/staticStorage';
import { dashboardUrl } from '../constants/routes';
import WindowBlockingComponent from '../components/windowBlockingComponent';

class GetRoutes extends React.Component<IGetRoutesProps, any> {
  authorized = () => {
    if ( !!localStorage.getItem( 'token' ) ) {
      if ( localStorage.getItem( 'token' ) === '4be0643f-1d98-573b-97cd-ca98a65347dd' ) {
        getBuildEnvironment( EBuildEnvironment.Test );
        StaticStorage.serviceLocator = environments.get( buildEnvironment );
      }
      if ( !this.props.user.authorized ) {
        this.props.authorizationUserFlag( true );
      }
    } else {
      if ( this.props.user.authorized ) {
        this.props.authorizationUserFlag( false );
      }
    }
  };

  constructor( props: IGetRoutesProps ) {
    super( props );
    this.authorized();
    this.props.loadUserData();
  }

  componentDidUpdate( prevProps: IGetRoutesProps ) {
    this.authorized();
    console.info( this.props );
  }

  render() {
    return (
      <React.Fragment>
        <WindowBlockingComponent
          isBlocking={this.props.window.isBlockingWindow}
        />
        <Routes
          authorized={!!localStorage.getItem( 'token' )}
          roleUser={this.props.user.roleUser}
        />
        {this.props.user.authorized &&
        this.props.user.redirectDashboard &&
        this.props.location !== dashboardUrl &&
        <Redirect to={dashboardUrl}/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    location: state.router.location.pathname,
    user: state.user,
    window: state.window,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      authorizationUserFlag,
      redirectDashboard,
      loadUserData,
    },
    dispath );

const Routers: any = withRouter( connect<any, any, any>( mapStateToProps, mapDispatchToProps )( GetRoutes ) );

export function getRoutes() {
  return <Routers/>;
}
