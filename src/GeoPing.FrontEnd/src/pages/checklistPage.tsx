import * as React from 'react';
import { IChecklistPageProps } from '../componentProps/checklistPageProps';
import GoogleMapComponent from '../components/googleMapComponent';

export default class ChecklistPage extends React.Component<IChecklistPageProps, any> {
  render() {
    return (
      <React.Fragment>
        <div>
        Checklist
        </div>
        <div>
          <GoogleMapComponent />
        </div>
      </React.Fragment>
    );
  }
}
