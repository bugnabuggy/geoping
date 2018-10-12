import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IProfileContainerProps } from '../componentContainerProps/profileContainerProps';
import ProfileComponent from '../components/forms/profile';
import { changePassword, loadProfileData, upgradeAccount } from '../actions/profileAction';
import IinitialStateType from '../types/stateTypes/initialStateType';

class ProfileComponentContainer extends React.Component<IProfileContainerProps, any> {
  render() {
    return (
      <ProfileComponent
        profileState={this.props.getProfileState}

        loadProfileDataAction={this.props.loadProfileData}
        changePasswordAction={this.props.changePassword}
        upgradeAccountAction={this.props.upgradeAccount}
      />
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    getProfileState: state.profile
  };
};
const mapDispatchToProps = ( dispatch: any ) => {
  bindActionCreators(
    {
      loadProfileData,
      changePassword,
      upgradeAccount
    },
    dispatch );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProfileComponentContainer );