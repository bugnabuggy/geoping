import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';
import { Button } from 'react-bootstrap';
import { IProfileComponentProps } from '../../componentProps/profileComponentProps';
import { ModalChangePasswordComponent } from  '../modalComponents/modalChangePasswordComponent';
import IUserType from '../../DTO/userDTO';

class ProfileComponent extends React.Component<IProfileComponentProps, any> {

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount () {
    this.props.loadProfileData('id');

  }

  submit (e: any) {
    const newProfileData: IUserType = {
      identityId: this.props.profileState.identityId,
      isActivated: this.props.profileState.isActivated,
      id: this.props.profileState.id,
      email: e.email,
      login: e.login,
      accountType: e.accountType,
      firstName: e.firstName,
      lastName: e.lastName,
      birthday: e.birthday,
      phone: e.phone,
      lastPaid: e.lastPaid,
      avatar: this.props.profileState.avatar,
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
              Last paid <em>{this.props.profileState.lastPaid}</em>
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
