import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Routes from './routesComponent';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import IGetRoutesProps from '../componentProps/routerProps/getRoutesProps';

class GetRoutes extends React.Component<IGetRoutesProps, any> {
  render() {
    return (
      <Router>
        <Routes
          authorized={this.props.authorized}
          roleUser={this.props.roleUser}
        />
      </Router>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    authorized: state.user.authorized,
    location: state.router.location.pathname,
    roleUser: state.user.roleUser,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators( {}, dispath );

// export default connect ( mapStateToProps, mapDispatchToProps ) ( GetRoutes );
const Routers: any = connect( mapStateToProps, mapDispatchToProps )( GetRoutes );

export function getRoutes() {
  return <Routers/>;
}