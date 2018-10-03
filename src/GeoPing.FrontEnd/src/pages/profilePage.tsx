import * as React from 'react';
import { IProfilePageProps } from '../componentProps/profilePageProps';
import ProfileComponentContainer   from  '../componentContainers/profileComponentContainer';

export default class ProfilePage extends React.Component<IProfilePageProps, any> {
  render() {
    return (
      <React.Fragment>
        <ProfileComponentContainer />
      </React.Fragment>
    );
  }
}
