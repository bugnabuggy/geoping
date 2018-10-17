import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';
import { Button } from 'react-bootstrap';
import { IProfileComponentProps } from '../../componentProps/profileComponentProps';

class ProfileComponent extends React.Component<IProfileComponentProps, any> {

  constructor(props: any) {
    super(props);

    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount () {
    this.props.loadProfileData();
  }
  // loadProfile() {
  //   console.log(this,'this');
  //   this.props.loadProfileData();
  //   clearTimeout ( this.timer );
  // }

  submit (e: any) {
    const a: any = 'a';
  }



  render() {
    return (
      <div className="profile-page">
        <div className="flex-box-col">
          <label htmlFor="profile-form">Profile</label>
          <ProfileReduxForm
            onSubmit={this.submit}
            initialValues={this.props.profileState}
            // changePassword={this.props.changePassword}
          />
          <label htmlFor="payment-info">Payment info</label>
          <div className="payment-info">
            <div className="last-paid-flex">
              Last paid {this.props.profileState.lastPaid}
            </div>
            <Button
              bsStyle="primary"
              type="button"
              onClick={this.changePassword}
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
