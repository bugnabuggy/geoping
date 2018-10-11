import * as React from 'react';

import { IChecklistPageProps } from '../componentProps/checklistPageProps';
import CheckListTitleComponentContainer from '../componentContainers/checkListTitleComponentContainer';
import CheckListComponentContainer from '../componentContainers/checkListComponentContainer';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';
import { YandexMapComponent } from '../components/yandexMapComponent';

export default class ChecklistPage extends React.Component<IChecklistPageProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="check-list-container">
          <div className="check-list-title">
            <CheckListTitleComponentContainer />
          </div>
          <div className="check-list">
            <CheckListComponentContainer/>
          </div>
          <div className="check-list-map">
            <GoogleMapComponentContainer />
            {/*<YandexMapComponent/>*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
