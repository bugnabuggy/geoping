import * as React from 'react';
import { Table, Button, FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import * as toastr from 'toastr';
import axios from 'axios';

import AddNewUserForm from './forms/Sample.formNewUser';

export class WishList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      optionsSelect: [],
    };
    toastr.options.closeButton = true;
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'linear';
    toastr.options.progressBar = true;
    toastr.options.preventDuplicates = true;
    toastr.options.showMethod = 'slideDown';
  }

  componentDidMount() {
    // this.props.getRecordsAction();
    // this.props.getSpecialtyAction();
  }

  sendFromServer = (value: any) => {
    // this.props.sendNewUserAction(value);
  }

  getDataOfForm = (value: any, field: string) => {
    return value.target.elements[field].value;
  }

  handleSubmit = (value: any) => {
    const sendObj: Object = {
      id: this.props.wishList.length + 2,
      user_name: this.getDataOfForm(value, 'user_name'),
      user_second_name: this.getDataOfForm(value, 'user_second_name'),
      user_age: Number(this.getDataOfForm(value, 'user_age')),
      user_address: this.getDataOfForm(value, 'user_address'),
      user_phone: this.getDataOfForm(value, 'user_phone'),
      specialty_list_Id: Number(this.getDataOfForm(value, 'specialty_list_Id')),
    };

    console.log(sendObj);
    this.sendFromServer(sendObj);
    value.preventDefault();
    return false;
  }

  awsLambda = () => {
    axios.get('https://59fr6bx8xi.execute-api.ap-northeast-1.amazonaws.com/handle-API/handle')
      .then((response: any) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  renderTableRow = () => {
    const rows: Array<any> = this.props.wishList.map((user: any, index: number) => {
      return (
        <tr key={uuidv4()}>
          <td>{index + 1}</td>
          <td>{user.user_name}</td>
          <td>{user.user_second_name}</td>
          <td>{user.user_age}</td>
          <td>{user.user_address}</td>
          <td>{user.user_phone}</td>
          <td>{user.specialty_list && user.specialty_list.specialty}</td>
        </tr>
      );
    });
    return rows;
  }

  render() {
    return (
      <div className="table-margin">
        <div className="form-container">
          <div className="form-style">
            <AddNewUserForm
              specialty={this.props.specialty}
            />
            {/* <Button
              bsStyle="primary"
              onClick={this.awsLambda}
            >
              AWS Lambda
            </Button> */}
          </div>
        </div>
        <Table responsive={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Second Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Specialty</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRow()}
          </tbody>
        </Table>
      </div>
    );
  }
}
