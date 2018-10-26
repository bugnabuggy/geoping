import * as React from 'react';

import AboutComponentContainer from '../componentContainers/aboutComponentContainer';
import IAboutPageProps from '../pageProps/aboutPageProps';

export class AboutComponent extends React.Component<IAboutPageProps, any> {
  render() {
    return (
      <div>
        <AboutComponentContainer/>
      </div>
    );
  }
}