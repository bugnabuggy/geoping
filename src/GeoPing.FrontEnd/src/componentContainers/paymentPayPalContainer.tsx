import * as React from 'react';
import IPaymentPayPalContainerProps from '../componentContainerProps/paymentPayPalContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { paymentPayPal } from '../actions/paymentAction';

class PaymentPayPalContainer extends React.Component<IPaymentPayPalContainerProps, any> {
  payment: queryString.OutputParams;

  componentDidMount(): void {
    this.payment = queryString.parse( this.props.location.search );
  }

  render() {
    return (
      <div className="payment-pay-pal-container">
        <div className="payment-pay-pal-message">
          <h1>Payment is success</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      paymentPayPal,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( PaymentPayPalContainer );
