var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var storage = require('../tests/mocks/browserStorage');

import 'raf/polyfill';
import { shallow, render, mount, configure } from 'enzyme';
const Adapter = require("enzyme-adapter-react-16");
//import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

const { document } = (new JSDOM('')).window;
global.document = document;

//document.defaultView.localStorage = storage;
//document.defaultView.sessionStorage = storage;

global.window = document.defaultView;

var exposedProperties = ['window', 'navigator', 'document'];

//Object.keys(document.defaultView).forEach((property) => {
  //if (typeof global[property] === 'undefined') {
    //exposedProperties.push(property);
   // global[property] = document.defaultView[property];
 // }
//});

global.navigator = {
    userAgent: 'node.js'
  };

  if(!module.parent) {
    app.server.listen(port);
  }