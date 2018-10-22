import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';
import { Button } from 'react-bootstrap';
import { IProfileComponentProps } from '../../componentProps/profileComponentProps';
import { ModalChangePasswordComponent } from  '../modalComponents/modalChangePasswordComponent';

class ProfileComponent extends React.Component<IProfileComponentProps, any> {

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount () {
    this.props.loadProfileData('id');

  }

  submit (e: any) {
    const newProfileData: any = {
      email: e.email,
      login: e.login,
      accountType: e.accountType,
      fullName: e.fullName,
      phone: e.phone,
      lastPaid: e.lastPaid,
    };
    this.props.updateProfileData(newProfileData);
  }

  render() {
    return (
      <div className="profile-page">
         <div className="flex-box-col">
          <label htmlFor="profile-form">Profile</label>
          {this.props.profileState.isLoaded ?
            <ProfileReduxForm
              onSubmit={this.submit}
              initialValues={this.props.profileState}
              showModalChangePassword={this.props.showModalChangePassword}
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
              Last paid {this.props.profileState.lastPaid}
            </div>
            <Button
              bsStyle="primary"
              type="button"
              href="#"
            >
              Upgrade Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
