import 'mocha';
import { assert } from 'chai';

import {validate} from '../../src/validations/loginFormValidate';

describe ( ' test component', () => {
  it ( 'enter Login and password', () => {
    let objVal = validate([]);
    const testInput = {
        login: 'login',
        password: '12345678',
    };
    const test = validate(testInput);

    debugger;
    assert.equal ( objVal.login, 'required to be filled out' );
    assert.equal( test.login, undefined);
    assert.equal ( objVal.password, 'required to be filled out' );
    assert.equal( test.password, undefined);

  } );
  it ( 'enter Login and password', () => {
    let objVal = validate([]);
    const testInput = {
        login: '',
        password: '12345678',
    };
    const test = validate(testInput);

    debugger;
    assert.equal ( objVal.login, 'required to be filled out' );
    assert.equal( test.login, 'required to be filled out');
    assert.equal ( objVal.password, 'required to be filled out' );
    assert.equal( test.password, undefined);

  } );
  it ( 'enter Login and password', () => {
    let objVal = validate([]);
    const testInput = {
      login: 'login',
      password: '1234567',
    };
    const test = validate(testInput);

    debugger;
    assert.equal ( objVal.login, 'required to be filled out' );
    assert.equal( test.login, undefined);
    assert.equal ( objVal.password, 'required to be filled out' );
    assert.equal( test.password, 'password must be longer than 7 symbols');

  } );
  it ( 'enter Login and password', () => {
    let objVal = validate([]);
    const testInput = {
      login: 'login',
      password: '',
    };
    const test = validate(testInput);

    debugger;
    assert.equal ( objVal.login, 'required to be filled out' );
    assert.equal( test.login, undefined);
    assert.equal ( objVal.password, 'required to be filled out' );
    assert.equal( test.password, 'required to be filled out');

  } );
} );