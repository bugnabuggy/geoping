import * as webdriver from 'selenium-webdriver';
import { assert } from 'chai';

import { DEV_SERVER, TEST_END_WAIT } from '../e2e.variables';

const path: string = '.\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe';
const customPhantom: any = webdriver.Capabilities.phantomjs();
customPhantom.set( 'phantomjs.binary.path', path );
const by = webdriver.By,
  until = webdriver.until,
  driver: any = new webdriver
    .Builder()
    .withCapabilities( customPhantom )
    .build();

describe( 'About page ', () => {

  beforeEach( () => {
    driver.manage().window().setSize(1024, 1024);
    driver.navigate().to( DEV_SERVER );
  } );

  it( 'get title', ( done ) => {
    driver.getTitle()
      .then( ( response: any ) => {
        assert.equal( response, 'Geo ping' );
        done();
      } );
  } ).timeout( TEST_END_WAIT );

  it( 'get button "Test User"', ( done ) => {
    const name: any = by.css( '*[name="testUser"]' );
    driver.findElement( name )
      .then( ( element: any ) => {
        return element.getText();
      } )
      .then( ( text: any ) => {
        assert.equal( text, 'Test User' );
        done();
      } );

  } ).timeout( TEST_END_WAIT );
} );
