import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PulseLoader } from 'react-spinners';

import { CheckListComponent } from '../components/listComponents/checkListComponent';
import IMyCheckListsContainerProps from '../componentContainerProps/myCheckListsContsinerProps';
import { filterCheckLists, openModalForCreateCheckList, selectCheckList } from '../actions/checkListAction';
import { clearStateMyCheckLists, deleteCheckList, loadCheckLists, showModalShare } from '../actions/myCheckListsAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { Card, CardBody } from 'reactstrap';

class MyCheckListsContainer extends React.Component<IMyCheckListsContainerProps, any> {

  renderComponentCheckLists = () => {
    const components: Array<any> = this.props.checkLists.map( ( item: any, index: number ) => {
      const key: string = `${index}_checkLists`;
      return (
        <CheckListComponent
          key={key}
          checkList={item}
          showModalShare={this.props.showModalShare}
          deleteCheckList={this.props.deleteCheckList}
          selectCheckList={this.props.selectCheckList}
        />
      );
    } );

    return components;
  };

  componentDidMount() {
    this.props.loadCheckLists();
  }

  componentWillUnmount() {
    this.props.clearStateMyCheckLists();
  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-check-list-title">
          <h4>My Check lists</h4>

          <div
            className="dashboard-check-list-icon-pluse dashboard-check-list-icon-pluse-container cursor-pointer"
            onClick={this.props.openModalForCreateCheckList}
          >
            <FontAwesomeIcon icon="plus-circle"/>
          </div>
          <div
            className="dashboard-check-list-icon-filter dashboard-check-list-icon-filter-container cursor-pointer"
            onClick={this.props.filterCheckLists}
          >
            <FontAwesomeIcon icon="filter"/>
          </div>
        </div>
        <Card>
          <div className="dashboard-check-list-panel-body">
            <CardBody>

              {this.props.myCheckList.isLoading ?
                (
                  <div className="container-spinner-center">
                    <PulseLoader
                      sizeUnit="px"
                      size={15}
                      margin="4px"
                      color={'#a9a9a9'}
                      loading={this.props.myCheckList.isLoading}
                    />
                  </div>
                )
                :
                this.props.checkLists.length > 0 ?
                  this.renderComponentCheckLists()
                  :
                  (
                    <React.Fragment>
                      No records
                    </React.Fragment>
                  )
              }
            </CardBody>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    myCheckList: state.myCheckList,
    checkLists: state.checkList.checkLists,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      showModalShare,
      openModalForCreateCheckList,
      filterCheckLists,
      loadCheckLists,
      deleteCheckList,
      clearStateMyCheckLists,
      selectCheckList,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( MyCheckListsContainer );
