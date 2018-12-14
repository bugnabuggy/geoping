import * as React from 'react';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IPublicListInfoContainerProps from '../componentContainerProps/publicListInfoContainerProps';
import { PublicListGeoPointList } from '../components/publicListGeoPointList';
import { loadPublicCheckListInfo } from '../actions/publicChecListAction';

class PublicListInfoContainer extends React.Component<IPublicListInfoContainerProps, any> {
  componentDidMount(): void {
    this.props.loadPublicCheckListInfo( this.props.listId );
  }

  render(): React.ReactNode {
    return (
      <div className="public-list-info-container">
        <span>%listName%</span>
        <p>Description</p>
        <PublicListGeoPointList/>
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadPublicCheckListInfo,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( PublicListInfoContainer );
