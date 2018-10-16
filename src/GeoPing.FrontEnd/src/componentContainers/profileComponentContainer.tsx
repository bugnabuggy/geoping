import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IProfileComponentContainerProps } from '../componentContainerProps/profileComponentContainerProps';
import ProfileComponent from '../components/forms/profile';
import { changePassword, loadProfileData, upgradeAccount } from '../actions/profileAction';
import IinitialStateType from '../types/stateTypes/initialStateType';

class ProfileComponentContainer extends React.Component<IProfileComponentContainerProps, any> {
  render() {
    return (
        <ProfileComponent
          profileState={this.props.profileState}

          loadProfileData={this.props.loadProfileData}
          changePassword={this.props.changePassword}
          // upgradeAccount={this.props.upgradeAccount}
        />
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    profileState: state.profile
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      loadProfileData,
      changePassword
    },
    dispatch );

export default connect(mapStateToProps, mapDispatchToProps)( ProfileComponentContainer ) ;