import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

import { CheckListComponent } from '../components/listComponents/checkListComponent';
import { checkLists } from '../mocks/dashboardCheckListsMock';
import IMyCheckListsContsinerProps, { ICheckLists } from '../componentProps/myCheckListsContsinerProps';
import { showModalShare } from '../actions/modalAction';

class MyCheckListsContainer extends React.Component<IMyCheckListsContsinerProps, any> {

  renderComponentCheckLists = () => {
    const components: Array<any> = this.props.checkLists.map ( ( item: ICheckLists, index: number ) => {
      const key: string = `${index}_checkLists`;
      return (
        <CheckListComponent
          key={key}
          name={item.name}
          showModalShare={this.props.showModalShare}
        />
      );
    } );

    return components;
  };

  render() {
    return (
      <React.Fragment>
        <Panel style={{height: '100%'}}>
          <div className="dashboard-check-list-panel-body">
            <Panel.Body>
              {this.renderComponentCheckLists ()}
            </Panel.Body>
          </div>
        </Panel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
    checkLists: checkLists,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    showModalShare,
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( MyCheckListsContainer );