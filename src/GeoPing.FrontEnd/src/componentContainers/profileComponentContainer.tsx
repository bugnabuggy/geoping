import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IProfileComponentContainerProps } from '../componentContainerProps/profileComponentContainerProps';
import ProfileComponent from '../components/forms/profile';
import {
  changePassword,
  closeModalChangePassword,
  loadProfileData,
  saveAvatar,
  showModalChangePassword,
  updateProfileData
} from '../actions/profileAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { getCountries, getTimeZones } from '../actions/utilitiesAction';

class ProfileComponentContainer extends React.Component<IProfileComponentContainerProps, any> {
  constructor( props: IProfileComponentContainerProps ) {
    super( props );
    props.getTimeZones();
    props.getCountries();
  }

  saveAvatar = () => {
    this.props.saveAvatar( this.props.avatar );
  };

  render() {
    return (
      <ProfileComponent
        profileState={this.props.profileState}
        isShowModal={this.props.isShowModal}
        window={this.props.window}

        loadProfileData={this.props.loadProfileData}
        updateProfileData={this.props.updateProfileData}
        changePassword={this.props.changePassword}
        showModalChangePassword={this.props.showModalChangePassword}
        closeModalChangePassword={this.props.closeModalChangePassword}
        // upgradeAccount={this.props.upgradeAccount}
        saveAvatar={this.saveAvatar}
      />
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    profileState: state.profile,
    isShowModal: state.profile.isShowModal,
    avatar: state.form.profile && state.form.profile.values && state.form.profile.values.avatar,
    window: state.window,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      loadProfileData,
      changePassword,
      updateProfileData,
      showModalChangePassword,
      closeModalChangePassword,
      saveAvatar,
      getTimeZones,
      getCountries,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( ProfileComponentContainer );
