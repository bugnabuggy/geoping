import * as React from 'react';
import ProfileReduxForm from './reduxForms/profileReduxForm';

class ProfileComponent extends React.Component<any, any> {

  constructor(props: any){
    super(props);

  }

  submit (e: any) {
    // print the form values to the console
    console.log('e', e);
  }

  render() {
    return (
      <div className="profile-page">
        <div className= 'profile-label'>Profile</div>
        <ProfileReduxForm
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

export default ProfileComponent;

