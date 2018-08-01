import * as React from 'react';

export class ContentComponent extends React.Component<any, any> {
  
  render(){
    return(
      <div className='wrapper'>
      <div className='wrapper-image'>
        <div className='wrapper-image-block'>
          <div className='image'>
            <img
              src='https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/026/landscape/react.png'
              alt='Image'
              width='200'
              height='100'
            />
          </div>
        </div>
      </div>
      <div className='wrapper-content'>
        <div>
          <input className='form-control input-field' />
          <input className='form-control input-field' />
          <div>
            <label className='input-field'>
              <input
                type='checkbox'
              /> Keep logged in
            </label>
          </div>
          <div className='loggin-button'>
            <button className='btn'>Loggin</button>
          </div>
        </div>
      </div>
      <div className='wrapper-footer footer2'>
        <div className='footer-content2'>
          bugnabuggy react template  + {this.props.location.state ? this.props.location.state.from : null}
          <label>{this.props.propsComponent}</label>
        </div>
      </div>
    </div>
    );
  }
}