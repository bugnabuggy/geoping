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
import { dashboardUrl, loginUrl } from '../constants/routes';
import WindowBlockingComponent from '../components/windowBlockingComponent';
import { isRedirect, redirectOnSignInForm } from '../actions/windowAction';
import { checkLocation } from '../services/helper';

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
      if ( !this.props.user.userName && !this.state.isGetUserData ) {
        this.props.loadUserData();
        this.setState( { isGetUserData: true } );
      }
      if ( sessionStorage.getItem( 'url_for_redirect' ) === this.props.location ) {
        sessionStorage.removeItem( 'url_for_redirect' );
        this.props.redirectDashboard( false );
      }
    } else {
      if ( this.props.user.authorized ) {
        this.props.authorizationUserFlag( false );
      } else {
        if ( !sessionStorage.getItem( 'url_for_redirect' ) ) {
          checkLocation( this.props.location, this.props.redirectOnSignInForm );
        }
      }
    }
  };

  constructor( props: IGetRoutesProps ) {
    super( props );
    console.info( 'GetRoutes constructor', props );
    this.state = {
      isGetUserData: false,
    };
  }

  componentDidMount() {
    this.authorized();
  }

  componentDidUpdate( prevProps: IGetRoutesProps ) {
    this.authorized();
    if ( !prevProps.window.redirect && this.props.window.redirect ) {
      this.props.isRedirect('');
    }
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
          path={this.props.location}
        />
        {this.props.user.authorized &&
        this.props.user.redirectDashboard &&
        this.props.location !== dashboardUrl &&
        this.props.location !== sessionStorage.getItem( 'url_for_redirect' ) &&
        <Redirect to={sessionStorage.getItem( 'url_for_redirect' ) || dashboardUrl}/>}
        {this.props.window.redirectOnSignInForm && this.props.location !== loginUrl &&
        <Redirect to={loginUrl}/>}
        {this.props.window.redirect &&
        <Redirect to={this.props.window.redirect}/>}
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
      redirectOnSignInForm,
      isRedirect,
    },
    dispath );

const Routers: any = withRouter( connect<any, any, any>( mapStateToProps, mapDispatchToProps )( GetRoutes ) );

export function getRoutes() {
  return <Routers/>;
}
