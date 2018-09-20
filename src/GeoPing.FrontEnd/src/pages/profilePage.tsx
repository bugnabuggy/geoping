import * as React from 'react';
import { IProfilePageProps } from '../componentProps/profilePageProps';
import ProfileComponent from  '../components/forms/profile';

export default class ProfilePage extends React.Component<IProfilePageProps, any> {
  render() {
    return (
      <React.Fragment>
        <ProfileComponent/>
      </React.Fragment>
    );
  }
}
