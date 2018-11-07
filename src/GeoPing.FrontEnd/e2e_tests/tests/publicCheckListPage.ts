import * as webdriver from 'selenium-webdriver';
import { DEV_SERVER, TEST_END_WAIT } from '../e2e.variables';
// import { assert } from 'chai';
// import * as variables from '../e2e.variables';

const path: string = '.\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe';
const customPhantom: any = webdriver.Capabilities.phantomjs();
customPhantom.set( 'phantomjs.binary.path', path );
const by = webdriver.By,
  until = webdriver.until,
  driver = new webdriver
    .Builder()
    .withCapabilities( customPhantom )
    .build();

describe( 'Public check list page ', () => {

  beforeEach( () => {
    driver.manage().window().maximize();
    driver.navigate().to( DEV_SERVER );
  } );

  it( 'find header', ( done ) => {
    const name: any = by.name( 'public' );
    const id: any = by.id( 'app' );
    driver.wait(
      driver.getPageSource()
        .then( ( element: any ) => {
          // console.log('element', element);
          driver.wait(
            driver.findElement( name )
              .click()
              .then( () => driver.getCurrentUrl() )
              .then( ( url: any ) => {
                console.info( 'url', url );
                // driver.wait(
                //   driver.findElement( name )
                //   .then( ( element1: any ) => {
                //   console.log('element1', element1);
                //   // return driver.getCurrentUrl();
                //     done();
                // }),
                //   10000
                // );
                setTimeout(
                  () => {
                    driver.wait(
                      driver.getPageSource()
                        .then( ( element2: any ) => {
                          console.info( 'element2', element2 );
                          driver.wait(
                            driver.findElement( name )
                              .then( ( element1: any ) => {
                                console.info( 'element1', element1 );
                                done();
                              } ),
                            10000
                          );
                        } ),
                      30000
                    );
                  },
                  5000
                );
              } ),
            10000
          );
        } ),
      30000
    );

  } ).timeout( TEST_END_WAIT );

} );