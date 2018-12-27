import * as React from 'react';
import IFilterPaymentContainerProps from '../componentContainerProps/filterPaymentContainerProps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { FormGroup, Input, Label } from 'reactstrap';
import { changeFilterField } from '../actions/paymentAction';

class FilterPaymentContainer extends React.Component<IFilterPaymentContainerProps, any> {
  render() {
    return(
      <div className="filter-payment-container">
        <FormGroup>
          <Label>Name</Label>
          <Input/>
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input/>
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      changeFilterField,
    },
    dispath
  );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( FilterPaymentContainer );
