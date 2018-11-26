import * as React from 'react';
import ITableMarkerStatisticsComponentContainerProps
  from '../componentContainerProps/tableMarkerStatisticsComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TableMarkerStatisticsComponent } from '../components/tableComponents/tableMarkerStatisticsComponent';

class TableMarkerStatisticsComponentContainer extends React.Component<ITableMarkerStatisticsComponentContainerProps,
  any> {
  render() {
    return (
      <React.Fragment>
        <TableMarkerStatisticsComponent
          googleMap={this.props.googleMap}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    googleMap: state.googleMap,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {},
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( TableMarkerStatisticsComponentContainer );
