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
import { loadCommoditiesList, paymentYandexCheckout, selectCommodities } from '../actions/paymentAction';

class ProfileComponentContainer extends React.Component<IProfileComponentContainerProps, any> {
  constructor( props: IProfileComponentContainerProps ) {
    super( props );
    props.getTimeZones();
    props.getCountries();
  }

  componentDidMount(): void {
    this.props.loadCommoditiesList();
  }

  componentDidUpdate(
    prevProps: Readonly<IProfileComponentContainerProps>,
    prevState: Readonly<any>, snapshot?: any
  ): void {
    if ( !prevProps.payment.yandexPaymentURL && !!this.props.payment.yandexPaymentURL ) {
      window.location.href = this.props.payment.yandexPaymentURL;
    }
  }

  saveAvatar = () => {
    this.props.saveAvatar( this.props.avatar );
  };

  render() {
    return (
      <React.Fragment>
        <ProfileComponent
          profileState={this.props.profileState}
          isShowModal={this.props.isShowModal}
          window={this.props.window}
          payment={this.props.payment}

          loadProfileData={this.props.loadProfileData}
          updateProfileData={this.props.updateProfileData}
          changePassword={this.props.changePassword}
          showModalChangePassword={this.props.showModalChangePassword}
          closeModalChangePassword={this.props.closeModalChangePassword}
          // upgradeAccount={this.props.upgradeAccount}
          saveAvatar={this.saveAvatar}
          paymentYandexCheckout={this.props.paymentYandexCheckout}
          selectCommodities={this.props.selectCommodities}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    profileState: state.profile,
    isShowModal: state.profile.isShowModal,
    avatar: state.form.profile && state.form.profile.values && state.form.profile.values.avatar,
    window: state.window,
    payment: state.payment,
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
      paymentYandexCheckout,
      loadCommoditiesList,
      selectCommodities,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( ProfileComponentContainer );
