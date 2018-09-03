import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class SampleApp extends React.Component<any, any> {

  style: any = {
    color: 'red'
  };

  constructor( props: any ) {
    super ( props );

    this.state = {
      login: '',
      password: '',
      isLoggetIn: false,
      redirect: false,
    };
  }

  handleChangeFormInput = ( e: any ) => {
    this.setState ( {
      [e.target.name]: e.target.value,
    } );
  }

  handleChangeFormCheckbox = ( e: any ) => {
    this.setState ( {
      [e.target.name]: e.target.checked,
    } );
  }

  handleRedirect = () => {
    this.setState ( {
      redirect: this.state.login && this.state.password && true
    } );
  }

  render() {
    return (
      <div className="container-div-width-100">
        <div className="image-block">
          <div className="image">
            <img
              src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/026/landscape/react.png"
              alt="Image"
              width="200"
              height="100"
            />
          </div>
        </div>
        <div className="form content-block">
          <div className="col-5">
            <span className="row">
              <h4>Please enter your account</h4>
            </span>
            <div className="row">
              <input
                name="login"
                className={`col input-margin form-control ${false ? 'input-error' : ''}`}
                value={this.state.login}
                placeholder={`${false ? 'Enter any characters' : ''}`}
                onChange={this.handleChangeFormInput}
              />
            </div>
            <div className="row">
              <input
                name="password"
                type="password"
                className={`col input-margin form-control ${false ? 'input-error' : ''}`}
                value={this.state.password}
                placeholder={`${false ? 'Enter any characters' : ''}`}
                onChange={this.handleChangeFormInput}
              />
            </div>
            <div className="row">
              <label>
                <input
                  className="input-margin"
                  name="isLoggetIn"
                  type="checkbox"
                  checked={this.state.isLoggetIn}
                  onChange={this.handleChangeFormCheckbox}
                /> Keep logged in
              </label>
            </div>
            <div className="row justify-content-center input-margin">
              <button
                className="btn button-cursor-pointer"
                onClick={this.handleRedirect}
              >Login
              </button>
              {
                this.state.redirect ?
                  <Redirect
                    push={true}
                    to={{
                      pathname: '/wishList',
                      state: { from: 4564686 + ' Button' }
                    }}
                  />
                  : null
              }
            </div>
          </div>
        </div>
        <footer className="col-12 footer">
          <div className="footer-content">
            <span className="col-5">
              <label className="label">
                <Link
                  to="/readme"
                >
                  Read me
                </Link>
              </label>
              <label className="label">
                <Link
                  to={{
                    pathname: '/contacts',
                    state: { from: 'Menu' }
                  }}
                >
                  Form 2
                </Link>
              </label>
            </span>
            <div className="col-5">
              <h6 className="footer-text">bugnabuggy react
                <span style={this.style}> template </span>
                <a href="https://github.com/bugnabuggy/ReactProjectTemplate"> github </a>
              </h6>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
