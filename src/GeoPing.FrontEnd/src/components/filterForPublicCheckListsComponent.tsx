import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { debounce } from 'throttle-debounce';

import IFilterForPublicCheckListsComponentProps from '../componentProps/filterForPublicCheckListsComponentProps';

export class FilterForPublicCheckListsComponent extends React.Component<IFilterForPublicCheckListsComponentProps, any> {

  user: any;
  name: any;
  subscribers: any;
  handleChange = ( e: any ) => {
    const filterBy: any = {
      Name: this.name,
      User: this.user,
      Subscribers: this.subscribers,
    };
    filterBy[ e.target.name ](
      {
        name: e.target.name,
        value: e.target.name === 'Subscribers' ? Number( e.target.value ) : e.target.value
      }
    );

    const value: string | number = e.target.name === 'Subscribers' ? Number( e.target.value ) : e.target.value;
    this.props.changeFilter( e.target.name, value );
  };
  filter = ( filter: any ) => {
    const filters: any = {
      name: this.props.filterName,
      user: this.props.filterUser,
      subscribers: this.props.filterSubscribers,
    };
    this.props.filterPublicCheckLists( filters );
  };

  constructor( props: any ) {
    super( props );
    const debounceTime: number = 2000;
    this.user = debounce( debounceTime, this.filter );
    this.name = debounce( debounceTime, this.filter );
    this.subscribers = debounce( debounceTime, this.filter );
  }

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
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}