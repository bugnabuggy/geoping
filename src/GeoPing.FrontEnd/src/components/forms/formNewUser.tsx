import * as React from 'react';
import { Table, Button, FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps, FormInstance } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

interface IAddNewUserFormProps extends InjectedFormProps {
  specialty: any;
}

class AddNewUserForm extends React.Component<IAddNewUserFormProps, any> {
  constructor(props: any) {
    super(props);
  }

  handleSubmit = (value: any) => {
  }

  renderOptionsSelect = () => {
    const options: Array<any> = this.props.specialty.map((list: any) => {
      return (<option key={uuidv4()} value={list.id}>{list.specialty}</option>);
    });
    return options;
  }

  renderSelectComponent = (props: any) => {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <FormControl
          {...props.input}
          componentClass="select"
          placeholder="select"
          name="specialty_list_Id"
        >
          {/* {this.renderOptionsSelect()} */}
        </FormControl>
      </FormGroup>
    );
  }

  renderComponent = (props: any) => {
    console.log(props);
    return (
      <FormGroup>
        <ControlLabel>{props.labelName}</ControlLabel>{' '}
        <FormControl
          {...props.input}
          type="text"
          placeholder={props.placeholder}
          componentClass={props.componentClass}
        >
          {props.list}
        </FormControl>
      </FormGroup>
    );
  }
  render() {
    return (
      <form>
        <Field
          name="user_name"
          component={this.renderComponent}
          placeholder="Enter Name"
          labelName="Name *"
        />
        <Field
          name="user_second_name"
          component={this.renderComponent}
          placeholder="Enter Second Name"
          labelName="Second Name *"
        />
        <Field
          name="user_age"
          component={this.renderComponent}
          placeholder="Enter Age"
          labelName="Age"
        />
        <Field
          name="user_address"
          component={this.renderComponent}
          placeholder="Enter Address"
          labelName="Address"
        />
        <Field
          name="user_phone"
          component={this.renderComponent}
          placeholder="Phone"
          labelName="Enter Phone"
        />
        <Field
          name="user_phone"
          component={this.renderComponent}
          placeholder="Phone"
          labelName="Enter Phone"
        />
        <Field
          name="specialty_list_Id"
          component={this.renderComponent}
          labelName="Select"
          componentClass="select"
          list={this.renderOptionsSelect()}
        />
      </form>
      // <Form onSubmit={this.handleSubmit} horizontal>
      //   <FormGroup>
      //     <ControlLabel>Name *</ControlLabel>{' '}
      //     <FormControl
      //       type="text"
      //       name="user_name"
      //       placeholder="Enter Name"
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <ControlLabel>Second Name *</ControlLabel>{' '}
      //     <FormControl
      //       type="text"
      //       name="user_second_name"
      //       placeholder="Enter Second Name"
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <ControlLabel>Age</ControlLabel>{' '}
      //     <FormControl
      //       type="text"
      //       name="user_age"
      //       placeholder="Enter Age"
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <ControlLabel>Address</ControlLabel>{' '}
      //     <FormControl
      //       type="text"
      //       name="user_address"
      //       placeholder="Enter Address"
      //     />
      //   </FormGroup>
      //   <FormGroup>
      //     <ControlLabel>Phone</ControlLabel>{' '}
      //     <FormControl
      //       type="text"
      //       name="user_phone"
      //       placeholder="Enter Phone"
      //     />
      //   </FormGroup>
      //   <FormGroup controlId="formControlsSelect">
      //     <ControlLabel>Select</ControlLabel>
      //     <FormControl
      //       componentClass="select"
      //       placeholder="select"
      //       name="specialty_list_Id"
      //     >
      //       {/* {this.renderOptionsSelect()} */}
      //     </FormControl>
      //   </FormGroup>
      //   <Button
      //     bsStyle="primary"
      //     type="submit"
      //   // onClick={this.handleSubmit}
      //   >
      //     Loading
      //     </Button>
      // </Form>
    );
  }
}

export default reduxForm<AddNewUserForm>({
  form: 'NewUser',
})(AddNewUserForm as any);