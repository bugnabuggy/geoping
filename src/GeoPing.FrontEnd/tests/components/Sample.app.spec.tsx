import 'mocha';
import { assert } from 'chai';

import { setup } from '../setupComponentViaEnzyme';
import { SampleApp } from '../../src/components/Sample.app';

const props = {};

describe ( ' test component', () => {
  it ( 'enter sampleLogin and password', () => {
    const cmpnt = setup ( SampleApp, props );
    const instance = cmpnt.instance () as SampleApp;
    const changeLogin = {
      target: {
        name: 'login',
        value: 'fds',
      },
    };
    const changePassword = {
      target: {
        name: 'password',
        value: 'fdagfdhs',
      },
    };
    debugger;
    assert.equal ( instance.state.login, '' );
    cmpnt.find ( `[name="login"]` ).simulate ( 'change', changeLogin );
    assert.equal ( instance.state.login, changeLogin.target.value );
    assert.equal ( instance.state.password, '' );
    cmpnt.find ( `[name="password"]` ).simulate ( 'change', changePassword );
    assert.equal ( instance.state.password, changePassword.target.value );
  } );
} );