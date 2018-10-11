import * as React from 'react';
import {YMaps} from 'react-yandex-maps';

export class YandexMap extends React.Component {
  render() {
    return (
      <React.Fragment>
        <YMaps>
          <div>My awesome application with maps!</div>
        </YMaps>
      </React.Fragment>
    );
  }
}