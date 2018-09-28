import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IProfileContainerProps } from '../componentProps/profileContainerProps';
import ProfileComponent from '../components/forms/profile';
import { loadProfileData, changePassword, upgradeAccount } from '../actions/profileAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class ProfileComponentContainer  extends React.Component<IProfileContainerProps, any> {
  render() {
    console.log(this.props);
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
const mapStateToProps = (state: IinitialStateType) => {
  return {
    getProfileState: state.profile
  };
};
const mapDispatchToProps =  (dispatch: any) => {
  bindActionCreators(
    {
    loadProfileData,
    changePassword,
    upgradeAccount
  },
    dispatch);
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (ProfileComponentContainer);