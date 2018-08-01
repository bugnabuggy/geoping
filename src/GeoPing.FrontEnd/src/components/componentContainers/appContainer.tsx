import * as React from 'react';
import { connect } from 'react-redux';

import { App } from '../app';

class AppContainer extends React.Component<any, any>{

  render() {
    return(<App />);
  }
}

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);