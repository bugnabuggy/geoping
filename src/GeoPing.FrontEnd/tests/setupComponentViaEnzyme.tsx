import * as React from 'react';
import { mount, shallow } from 'enzyme';
import 'react-dom/test-utils';

export function setup( Cmpnt: any, props?: any, isMount?: boolean ): any {
  if ( isMount ) {
    return mount ( <Cmpnt {...props} /> );
  } else {
    return shallow ( <Cmpnt {...props} /> );
  }
}