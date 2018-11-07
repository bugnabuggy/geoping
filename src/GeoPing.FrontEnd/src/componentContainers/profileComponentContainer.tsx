import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IProfileComponentContainerProps } from '../componentContainerProps/profileComponentContainerProps';
import ProfileComponent from '../components/forms/profile';
import {
  changePassword,
  closeModalChangePassword,
  loadProfileData,
  showModalChangePassword,
  updateProfileData
} from '../actions/profileAction';
import IinitialStateType from '../types/stateTypes/initialStateType';

class ProfileComponentContainer extends React.Component<IProfileComponentContainerProps, any> {
  render() {
    return (
      <ProfileComponent
        profileState={this.props.profileState}
        isShowModal={this.props.isShowModal}

        loadProfileData={this.props.loadProfileData}
        updateProfileData={this.props.updateProfileData}
        changePassword={this.props.changePassword}
        showModalChangePassword={this.props.showModalChangePassword}
        closeModalChangePassword={this.props.closeModalChangePassword}
        // upgradeAccount={this.props.upgradeAccount}
      />
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    profileState: state.profile,
    isShowModal: state.profile.isShowModal
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      loadProfileData,
      changePassword,
      updateProfileData,
      showModalChangePassword,
      closeModalChangePassword
    },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ProfileComponentContainer );