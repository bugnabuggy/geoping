import * as React from 'react';
import { CircleLoader } from 'react-spinners';

import IWindowBlockingComponentProps from '../componentProps/WindowBlockingComponentProps';

export default class WindowBlockingComponent extends React.Component<IWindowBlockingComponentProps, any> {

  render() {
    return this.props.isBlocking && (
      <div className="window-container">
        <CircleLoader
          sizeUnit="px"
          size={150}
          color="#1daf799e"
          loading={true}
        />
      </div>
    );
  }
}
