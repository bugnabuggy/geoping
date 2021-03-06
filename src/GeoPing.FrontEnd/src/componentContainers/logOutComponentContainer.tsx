import * as React from 'react';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/userAction';
import ILogOutComponentContainerProps from '../componentContainerProps/logOutComponentContainerProps';
import { baseUrl } from '../constants/routes';
import { Redirect } from 'react-router';
import { buildEnvironment, environments, getBuildEnvironment } from '../services/environmentsServiceLocator';
import { EBuildEnvironment } from '../enums/environment';
import StaticStorage from '../services/staticStorage';

class LogOutComponentContainer extends React.Component<ILogOutComponentContainerProps, any> {
  constructor( props: any ) {
    super( props );
  }

  componentDidMount() {
    getBuildEnvironment( EBuildEnvironment.HTTP );
    StaticStorage.serviceLocator = environments.get( buildEnvironment );
    this.props.signOutUser();

  }

  render() {
    return (
      <div>
        {this.props.user.authorized ? (
            <Redirect to={baseUrl}/>
          )
          :
          null}
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      signOutUser,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( LogOutComponentContainer );