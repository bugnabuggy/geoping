import * as React from 'react';

import Routes from './routesComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class GetRoutes extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Routes
          authorized={this.props.authorized}
        />
      </React.Fragment>
    );
  }
};

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    authorized: state.user.authorized,
    location: state.router.location.pathname,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
  }, dispath );

// export default connect ( mapStateToProps, mapDispatchToProps ) ( GetRoutes );
const Routers: any = connect ( mapStateToProps, mapDispatchToProps ) ( GetRoutes );

export function getRoutes(  ) {
  return <Routers/>;
}