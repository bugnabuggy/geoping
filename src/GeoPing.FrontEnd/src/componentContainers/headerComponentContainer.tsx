import * as React from 'react';
import { connect } from 'react-redux';
import { HeaderComponent } from '../components/headerComponent';
import IHeaderComponentContainerProps from '../componentProps/headerComponentProps/headerComponentContainerProps';

class HeaderComponentContainer extends React.Component<IHeaderComponentContainerProps, any> {
  render() {
    return(
      <React.Fragment>
        <HeaderComponent
          path={this.props.location.pathname}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
    location: state.router.location,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect ( mapStateToProps, mapDispatchToProps ) ( HeaderComponentContainer );