import * as React from 'react';
import { IProfilePageProps } from '../pageProps/profilePageProps';
import ProfileComponentContainer from '../componentContainers/profileComponentContainer';
export default class ProfilePage extends React.Component<IProfilePageProps, any> {
  render() {
    return (
      <React.Fragment>
        <div>
          <ProfileComponentContainer/>
        </div>
      </React.Fragment>
    );
  }
}