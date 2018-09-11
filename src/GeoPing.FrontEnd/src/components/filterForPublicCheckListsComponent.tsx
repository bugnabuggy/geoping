import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { debounce } from 'throttle-debounce';

import IFilterForPublicCheckListsComponentProps from '../componentProps/filterForPublicCheckListsComponentProps';

export class FilterForPublicCheckListsComponent extends React.Component<IFilterForPublicCheckListsComponentProps, any> {

  private user: any;
  private name: any;
  private subscribers: any;

  constructor( props: any ) {
    super ( props );
    this.user = debounce ( 2000, this.filter );
    this.name = debounce ( 2000, this.filter );
    this.subscribers = debounce ( 2000, this.filter );
  }

  handleChange = ( e: any ) => {
    const filterBy: any = {
      Name: this.name,
      User: this.user,
      Subscribers: this.subscribers,
    };
    filterBy[e.target.name] ( { name: e.target.name, value: e.target.value } );
  };

  filter = ( filter: any ) => {
    console.log ( filter );
    this.props.changeFilter ( filter.name, filter.value );
  };

  render() {
    return (
      <React.Fragment>
        <Panel>
          <Panel.Body className="publick-check-list-filter-panel-body">
            <FormGroup className="filter-form-group-name">
              <ControlLabel>
                Name
              </ControlLabel>
              <FormControl
                name="Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="filter-form-group-user">
              <ControlLabel>
                User
              </ControlLabel>
              <FormControl
                name="User"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="filter-form-group-subscribers">
              <ControlLabel>
                Subscribers >
              </ControlLabel>
              <FormControl
                name="Subscribers"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}