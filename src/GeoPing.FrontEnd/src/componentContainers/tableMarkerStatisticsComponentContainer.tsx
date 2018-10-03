import * as React from 'react';
import ITableMarkerStatisticsComponentContainerProps
  from '../componentProps/tableMarkerStatisticsComponentContainerProps';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TableMarkerStatisticsComponent } from '../components/tableMarkerStatisticsComponent';

class TableMarkerStatisticsComponentContainer extends React.Component<ITableMarkerStatisticsComponentContainerProps,
  any> {
  render() {
    return (
      <React.Fragment>
        <TableMarkerStatisticsComponent/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {},
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( TableMarkerStatisticsComponentContainer );