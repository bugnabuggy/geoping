import * as React from 'react';
import { ModalComponent } from './checklist/modalComponent';
import IModalPaymentsProps from '../../componentProps/modalComponentProps/modalPaymentsProps';
import { SubscribersItemComponent } from '../subscribersItemComponent';
import { Button } from 'reactstrap';

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
                <Button
                  color="primary"
                  onClick={this.handleClick}
                >
                  Yandex payment
                </Button>
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