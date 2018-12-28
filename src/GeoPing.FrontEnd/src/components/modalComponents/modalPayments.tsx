import * as React from 'react';
import { ModalComponent } from './checklist/modalComponent';
import IModalPaymentsProps from '../../componentProps/modalComponentProps/modalPaymentsProps';
import { SubscribersItemComponent } from '../subscribersItemComponent';

export class ModalPayments extends React.Component<IModalPaymentsProps, any> {
  handleAmount = ( commodityId: string ) => {
    this.props.selectCommodities( commodityId );
  };
  handleClickYandex = () => {
    this.props.paymentYandexCheckout( this.props.payment.selectCommodityId );
    this.props.close();
  };
  handleClickPayPal = () => {
    this.props.paymentPayPalCheckout( this.props.payment.selectCommodityId );
    this.props.close();
  };

  _renderCommodities = () => {
    return this.props.payment.listProducts.map( item => {
      return (
        <SubscribersItemComponent
          key={item.id}
          count={1}
          commodities={item}
          currency={'r'}
          color="#7cd860"
          handleAmount={this.handleAmount}
        />
      );
    } );
  };

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Payment"
          show={this.props.show}
          close={this.props.close}
        >
          {!!this.props.payment.selectCommodityId ?
            (
              <div className="payment-checkout-container">
                <div
                  className="brand-yandex-button"
                  onClick={this.handleClickYandex}
                >
                  <img src="https://kassa.yandex.ru/files/Guide_files/logo-black.svg"/>
                </div>
                <div
                  className="brand-paypal-button"
                  onClick={this.handleClickPayPal}
                >
                  {/*<div id="paypal-button"/>*/}
                  <img
                    src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/buy-logo-large.png"
                    alt="Buy now with PayPal"
                  />
                </div>
                <div className="robokassa-formV">
                    <div className="">Buy</div>
                    <img className="robokassa-formV-image" src="../../assets/images/logo-s.png"/>
                </div>
              </div>
            ) :
            (
              <div className="subscribers-list-container">
                {this._renderCommodities()}
              </div>
            )}
        </ModalComponent>
      </React.Fragment>
    );
  }
}