import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

import { CheckListComponent } from '../components/listComponents/checkListComponent';
import { checkLists } from '../mocks/dashboardCheckListsMock';
import IMyCheckListsContainerProps, { ICheckLists } from '../componentContainerProps/myCheckListsContsinerProps';
import { deleteCheckList, showModalShare } from '../actions/myCheckListsAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModalForCreateCheckList } from '../actions/checkListAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { loadCheckLists } from '../actions/myCheckListsAction';

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
        />
      );
    } );

    return components;
  };

  componentDidMount() {
    this.props.loadCheckLists('ffdf');
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
          >
            <FontAwesomeIcon icon="filter"/>
          </div>
        </div>
        <Panel>
          <div className="dashboard-check-list-panel-body">
            <Panel.Body>
              {this.renderComponentCheckLists()}
            </Panel.Body>
          </div>
        </Panel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkLists: state.myCheckList.checkLists,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      showModalShare,
      openModalForCreateCheckList,
      loadCheckLists,
      deleteCheckList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( MyCheckListsContainer );