import * as webdriver from 'selenium-webdriver';
import { assert } from 'chai';
import { browser } from 'protractor';

import * as variables from '../e2e.variables';

const by = webdriver.By,
  until = webdriver.until,
  driver = new webdriver.Builder()
    .forBrowser( 'chrome' )
    .build();

describe( ' About page ', () => {
  beforeEach( () => {
    // ааваы
  } );
  afterEach( () => {
    // driver.quit();
  } );

  it( 'get button "test user"', ( done ) => {
    driver.get( variables.DEV_SERVER );
    driver.wait( until.elementLocated( by.linkText( 'Test User' ) ), variables.SHORT_WAIT );
    // const title: string = driver.getTitle();
    // assert.equal( driver.getTitle(), 'Geo ping' );
    // expect
    done();
    // browser.get( variables.DEV_SERVER );
    // expect().toEqual();
  } );
  // } ).timeout( 15000 );
} );