import * as React from 'react';
import { debounce } from 'throttle-debounce';

import IFilterForPublicCheckListsComponentProps
  from '../../componentProps/filterComponentProps/filterForPublicCheckListsComponentProps';
import { Card, CardBody, FormGroup, Input, Label } from 'reactstrap';

export class FilterForPublicCheckListsComponent extends React.Component<IFilterForPublicCheckListsComponentProps, any> {
  _debounce: any;
  handleChange = ( e: any ) => {
    const value: string | number = e.target.name === 'Subscribers' ? Number( e.target.value ) : e.target.value;
    this._debounce();
    this.props.changeFilter( e.target.name, value );
  };
  filter = () => {
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
    this._debounce = debounce( debounceTime, this.filter );
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody className="publick-check-list-filter-panel-body">
            <FormGroup className="filter-form-group-name">
              <Label>
                Name
              </Label>
              <Input name="Name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className="filter-form-group-user">
              <Label>
                User
              </Label>
              <Input
                name="User"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="filter-form-group-subscribers">
              <Label>
                Subscribers >
              </Label>
              <Input
                name="Subscribers"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}