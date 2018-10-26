import * as React from 'react';

import { YandexMap } from './forms/jsxComponents/yandexMap';

export class YandexMapComponent extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <YandexMap/>
      </React.Fragment>
    );
  }
}