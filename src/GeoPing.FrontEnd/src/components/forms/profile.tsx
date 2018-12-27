import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';
import { Button } from 'reactstrap';

import { IProfileComponentProps } from '../../componentProps/profileComponentProps';
import { ModalChangePasswordComponent } from '../modalComponents/modalChangePasswordComponent';
import { ModalPayments } from '../modalComponents/modalPayments';
import moment = require('moment');

class ProfileComponent extends React.Component<IProfileComponentProps, any> {
  window: any = window;

  constructor( props: any ) {
    super( props );
    this.state = {
      showPayments: false,
    };
    this.submit = this.submit.bind( this );
  }

  componentDidMount() {
    this.props.loadProfileData( 'id' );

  }

  openPaymentsModal = () => {
    this.setState( {
      showPayments: true,
    } );
  };
  closePaymentsModal = () => {
    this.setState( {
      showPayments: false,
    } );
  };

  submit( e: any ) {
    const newProfileData: any /*IUserType*/ = {
      identityid: this.props.profileState.identityId,
      isactivated: this.props.profileState.isActivated,
      id: this.props.profileState.id,
      email: e.email,
      login: e.login,
      accounttype: e.accountType,
      firstname: e.firstName,
      lastname: e.lastName,
      birthday: e.birthday,
      phonenumber: e.phoneNumber,
      lastpaid: e.lastPaid,
      country: e.country,
      timeZone: e.timeZone,
      // avatar: e.avatar ? e.avatar : this.props.profileState.avatar,
    };
    this.props.updateProfileData( newProfileData );
  }

  upgradeAccount = () => {
    this.openPaymentsModal();
  };

  render() {
    const date: any = moment( this.props.profileState.lastPaid );
    date.locale( 'ru' );
    return (
      <div className="profile-page">
        <div className="flex-box-col">
          {/*<label htmlFor="profile-form">Profile</label>*/}
          {this.props.profileState.isLoaded ?
            <ProfileReduxForm
              window={this.props.window}

              onSubmit={this.submit}
              initialValues={this.props.profileState}
              showModalChangePassword={this.props.showModalChangePassword}
              saveAvatar={this.props.saveAvatar}
            />
            : null
          }
          <ModalChangePasswordComponent
            isShowModal={this.props.isShowModal}
            closeModalChangePassword={this.props.closeModalChangePassword}
            changePassword={this.props.changePassword}
          />
          <label htmlFor="payment-info">Payment info</label>
          <div className="payment-info">
            <div className="last-paid-flex">
              Last paid <em>{date.format( 'L' )}</em>
            </div>
            <Button
              color="primary"
              onClick={this.upgradeAccount}
              disabled={!!this.props.payment.yandexPaymentURL}
            >
              Upgrade Account
            </Button>
          </div>
          {this.state.showPayments &&
          (
            <ModalPayments
              show={this.state.showPayments}
              payment={this.props.payment}

              close={this.closePaymentsModal}
              paymentYandexCheckout={this.props.paymentYandexCheckout}
              selectCommodities={this.props.selectCommodities}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
