import * as React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const enum Currency {
  Ruble = 'ruble-sign',
  Dollar = 'dollar-sign',
  Euro = 'euro-sign',
}

export function SubscribersItemComponent( props: any ) {
  const currency: any = {
    r: Currency.Ruble,
    d: Currency.Dollar,
    e: Currency.Euro,
  };
  const styles: any = {
    '--precent-background-color': props.color,
  };
  return (
    <div className="subscribers-item-container">
      <div
        className="subscribers-item-header-container"
        style={styles}
      >
        -20%
      </div>
      <div className="subscribers-item-body-container">
        {/*<h2>{props.count}</h2>*/}
        {/*<span>month</span>*/}
        <span>{props.commodities.name}</span>
        <span className="subscribers-item-body-price-container">
          <h4 className="subscribers-item-body-price">
            {props.commodities.cost}
          </h4>
          <FontAwesomeIcon icon={currency[ props.currency ]}/>
        </span>
      </div>
      <div className="subscribers-item-footer-container">
        <Button
          outline={true}
          color="info"
          onClick={() => {
            props.handleAmount( props.commodities.id );
          }}
        >
          Buy
        </Button>
      </div>
      <div className="subscribers-triangle-art-1"/>
      <div className="subscribers-triangle-art-2"/>
    </div>
  );
}
