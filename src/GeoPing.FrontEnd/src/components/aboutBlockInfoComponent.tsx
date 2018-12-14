import * as React from 'react';
import IAboutBlockInfoComponentProps from '../componentProps/aboutBlockInfoComponentProps';

export class AboutBlockInfoComponent extends React.Component<IAboutBlockInfoComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        <div
          className="about-page-block-container"
          style={{ flexDirection: this.props.imageLeftReverse ? 'row-reverse' : 'row' }}
        >
          <div
            className="about-page-block-image-container"
            style={{justifyContent: this.props.imageLeftReverse ? 'flex-end' : 'flex-start'}}
          >
            <img src={this.props.image}/>
          </div>
          <div className="about-page-block-info-container">
            <label><h3>{this.props.title}</h3></label>
            <p>
              {this.props.info}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}