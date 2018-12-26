import * as React from 'react';

import IYandexCheckoutComponentProps from '../../componentProps/paymentsProps/yandexCheckoutComponentProps';

import 'react-credit-cards/es/styles-compiled.css';

export class YandexCheckoutComponent extends React.Component<IYandexCheckoutComponentProps, any> {
  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="yandex-checkout-form-container">
          <iframe>
            dsd
          </iframe>
        </div>
      </React.Fragment>
    );
  }
}
