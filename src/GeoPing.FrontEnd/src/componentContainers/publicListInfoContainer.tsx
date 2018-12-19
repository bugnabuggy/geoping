import * as React from 'react';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IPublicListInfoContainerProps from '../componentContainerProps/publicListInfoContainerProps';
import { PublicListGeoPointList } from '../components/publicListGeoPointList';
import { loadPublicCheckListInfo } from '../actions/publicChecListAction';
import { selectPoint } from '../actions/googleMapAction';

class PublicListInfoContainer extends React.Component<IPublicListInfoContainerProps, any> {
  componentDidMount(): void {
    this.props.loadPublicCheckListInfo( this.props.listId );
  }

  render(): React.ReactNode {
    return (
      <div className="public-list-info-container">
        <label><h3>{this.props.checkListInfo.name}</h3></label>
        <p className="public-list-info-p">
          <span><b>Author:</b> {this.props.checkListInfo.ownerName}</span>
          <span><b>Rating:</b> {this.props.checkListInfo.rating}</span>
          <span><b>Subscribers:</b> {this.props.checkListInfo.subscribersNumber}</span>
        </p>
        <h5>Description:</h5>
        <p>{this.props.checkListInfo.description}</p>
        <PublicListGeoPointList
          googleMap={this.props.googleMap}

          selectPoint={this.props.selectPoint}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkListInfo: state.checkList.checkListPublicInfo,
    googleMap: state.googleMap,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadPublicCheckListInfo,
      selectPoint,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( PublicListInfoContainer );
