import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';
import { Button } from 'react-bootstrap';

class ProfileComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  submit (e: any) {
    // print the form values to the console
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
          />
          <label htmlFor="payment-info">Paiment info</label>
          <div className="payment-info">
            <div className="last-paid-flex">
              Last paid {this.props.profileState.lastPaid}
            </div>
            <Button
              bsStyle="primary"
              type="button"
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
