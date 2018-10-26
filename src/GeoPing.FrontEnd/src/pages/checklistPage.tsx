import * as React from 'react';

import { IChecklistPageProps } from '../pageProps/checklistPageProps';
import CheckListTitleComponentContainer from '../componentContainers/checkListTitleComponentContainer';
import CheckListComponentContainer from '../componentContainers/checkListComponentContainer';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';

export default class ChecklistPage extends React.Component<IChecklistPageProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="check-list-container">
          <div className="check-list-title">
            <CheckListTitleComponentContainer />
          </div>
          <div className="check-list">
            <CheckListComponentContainer
              idCheckList={this.props.match.params.id}
            />
          </div>
          <div className="check-list-map">
            <GoogleMapComponentContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
