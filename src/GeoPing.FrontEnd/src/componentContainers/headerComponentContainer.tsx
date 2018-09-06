import * as React from 'react';
import { connect } from 'react-redux';
import { HeaderComponent } from '../components/headerComponent';
import IHeaderComponentContainerProps from '../componentProps/headerComponentProps/headerComponentContainerProps';
import { bindActionCreators } from 'redux';
import { editRoute } from '../actions/headerAction';

class HeaderComponentContainer extends React.Component<IHeaderComponentContainerProps, any> {

  componentDidUpdate( prevProps: IHeaderComponentContainerProps ) {
    if ( this.props.routeKey !== this.props.location.pathname ) {
      this.props.editRoute ( this.props.location.pathname );
    }
  }

  render() {
    return (
      <React.Fragment>
        <HeaderComponent
          path={this.props.location.pathname}
          routeKey={this.props.routeKey}
          editRouteAction={this.props.editRoute}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
    location: state.router.location,
    routeKey: state.header.routeKey,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    editRoute
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( HeaderComponentContainer );