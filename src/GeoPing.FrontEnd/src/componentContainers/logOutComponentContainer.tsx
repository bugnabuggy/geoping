import * as React from 'react';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/userAction';
import ILogOutComponentContainerProps from '../componentContainerProps/logOutComponentContainerProps';
import { baseUrl } from '../constants/routes';
import { Redirect } from 'react-router';

class LogOutComponentContainer extends React.Component<ILogOutComponentContainerProps, any> {

  componentDidMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        {!this.props.user.authorized ? (
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

export default connect( mapStateToProps, mapDispatchToProps )( LogOutComponentContainer );