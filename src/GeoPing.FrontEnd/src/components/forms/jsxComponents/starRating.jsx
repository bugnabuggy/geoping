import * as React from 'react';
import * as Rater from 'react-rating';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const emptyStarIcon = {prefix: 'far', iconName: 'star'};
const fullStarIcon = {prefix: 'fas', iconName: 'star'};

export class StarRaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowRateTooltip: false,
      rateTooltipValue: undefined,
    };
  }

  handleChange(rate) {
    console.log(rate);
  };

  handleHover(rate) {
    this.setState({
      rateTooltipValue: rate
    });
  }

  render() {
    const Rate = Rater.default;
    return (
      <div
        className="rate-container"
      >
        <Rate
          emptySymbol={<FontAwesomeIcon icon={emptyStarIcon} className="rate-icon-empty"/>}
          fullSymbol={<FontAwesomeIcon icon={fullStarIcon} className="rate-icon-full"/>}
          fractions={2}
          onChange={this.handleChange.bind(this)}
          onHover={this.handleHover.bind(this)}
        />
        {this.state.rateTooltipValue &&
        <div
          className="rate-tooltip"
        >
          {this.state.rateTooltipValue}
        </div>
        }
      </div>
    );
  }
}