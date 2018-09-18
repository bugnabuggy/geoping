import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        type="text"
        placeholder={props.placeholder}
        componentClass={props.componentClass}
      />

    </FormGroup>
  );
};

const renderOptionsSelect = ( specialty: Array<any> ) => {
  const options: Array<any> = specialty.map ( ( list: any ) => {
    return ( <option key={uuidv4 ()} value={list.specialty}>{list.specialty}</option> );
  } );
  return options;
};

const renderSelect = ( props: any ) => {
  return (
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl
        {...props.input}
        componentClass={props.componentClass}
        placeholder={props.placeholder}
      >
        {renderOptionsSelect ( props.list )}
      </FormControl>
    </FormGroup>
  );
};

const renderComponent = ( componentFormMap: any ) => {
  const componentForRender: any = {
    input: renderInput,
    select: renderSelect,
  };

  const fields: Array<any> = componentFormMap.map ( ( item: any, index: number ) => {
    const key: string = `${index}_formNewUser`;
    return (
      <Field
        key={key}
        name={item.name}
        component={componentForRender[item.type || 'input']}
        placeholder={item.placeholder}
        labelName={item.labelName}
        componentClass={item.componentClass}
        list={item.list}
      />
    );
  } );

  return fields;
};

function AddNewUserFormfunc( props: any ): any {
  const { handleSubmit } = props;
  return (
    <form>
      {renderComponent ( props.componentFormMap )}
      <Button
        bsStyle="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Loading
      </Button>
    </form>
  );
}

const NewUserReduxForm: any = reduxForm ( {
  form: 'NewUser',
} ) ( AddNewUserFormfunc as any );

export default NewUserReduxForm;