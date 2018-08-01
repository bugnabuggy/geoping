import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class App extends React.Component<any, any> {
  constructor(props: any){
    super(props);
  }

  style = {
    color: 'red'
  };

  render(){
    return(
      <div className='container-div-width-100'>
        <div className='image-block'>
          <div className='image'>
            <img
              src='https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/026/landscape/react.png'
              alt='Image'
              width='200'
              height='100'
            />
          </div>
        </div>
        <div className='form content-block'>
          <div className='col-5'>
            <span className='row'>
              <h4>Please enter your account</h4>
            </span>
            <div className='row'>
              <input
                className={`col input-margin form-control ${false ? 'input-error' : ''}`}
                value={''}
                placeholder={`${false ? 'Enter any characters' : ''}`}
                onChange={() => {
                  // this.fieldChanged(e.target.value, 'login');
                }}
              />
            </div>
            <div className='row'>
              <input
                className={`col input-margin form-control ${false ? 'input-error' : ''}`}
                value={''}
                placeholder={`${false ? 'Enter any characters' : ''}`}
                onChange={() => {
                  // this.fieldChanged(e.target.value, 'password');
                }}
              />
            </div>
            <div className='row'>
              <label>
                <input
                  className='input-margin'
                  type='checkbox'
                  checked={false}
                  onChange={(isChanged) => {
                    this.setState({
                      isKeepLoggedIn: isChanged.target.checked
                    });
                    console.log(isChanged.target.checked);
                  }}
                /> Keep logged in
                            </label>
            </div>
            <div className='row justify-content-center input-margin'>
              <button
                className='btn button-cursor-pointer'
                onClick={() => {
                  // this.isLogin()
                }}
              >Login</button>
              {
                false ?
                  <Redirect
                    push
                    to={{
                      pathname: '/contacts',
                      state: { from: 4564686 + ' Button' }
                    }} />
                  : null
              }
            </div>
          </div>
        </div>
        <footer className='col-12 footer'>
          <div className='container'>
            <div className='row'>
              <span className='col-5'>
                <label className='label'>
                  <Link
                    to='/readme'
                  >Read me</Link>
                </label>
                <label className='label'>
                  <Link
                    to={{
                      pathname: '/contacts',
                      state: { from: 'Menu' }
                    }}
                  >Form 2</Link>
                </label>
              </span>
              <div className='col-5'>
                <h6 className='footer-content'>bugnabuggy react template <span style={this.style}>fsdfsdfsdf</span></h6>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}