import * as React from 'react';
import { ModalComponent } from './checklist/modalComponent';
import IModalPaymentsProps from '../../componentProps/modalComponentProps/modalPaymentsProps';
import { SubscribersItemComponent } from '../subscribersItemComponent';

export class ModalPayments extends React.Component<IModalPaymentsProps, any> {
  handleAmount = ( commodityId: string ) => {
    this.props.selectCommodities( commodityId );
  };
  handleClick = () => {
    this.props.paymentYandexCheckout( this.props.payment.selectCommodityId );
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
              <div>
                <div
                  className="brand-yandex-button"
                  onClick={this.handleClick}
                >
                  <img src="https://kassa.yandex.ru/files/Guide_files/logo-black.svg"/>
                </div>
                <div>
                  <div id="paypal-button"/>
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