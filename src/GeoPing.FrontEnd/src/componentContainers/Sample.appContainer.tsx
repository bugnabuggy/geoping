import * as React from 'react';
import { connect } from 'react-redux';

import { SampleApp } from '../components/Sample.app';

class SampleAppContainer extends React.Component<any, any> {

  render() {
    return ( <SampleApp/> );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
    state,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect ( mapStateToProps, mapDispatchToProps ) ( SampleAppContainer );