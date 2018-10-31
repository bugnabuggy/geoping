import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckListHeadComponent } from '../components/checkListHeadComponent';
import ICheckListTitleComponentContainerProps from '../componentContainerProps/checkListTitleComponentContainerProps';
import { modalPeriodOpenClose, updateCheckList, updateNameCheckList } from '../actions/checkListAction';
import { ModalPeriodComponent } from '../components/modalComponents/checklist/modalPeriodComponent';

class CheckListTitleComponentContainer extends React.Component<ICheckListTitleComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="check-list-head">
          <CheckListHeadComponent
            checkList={this.props.checkList}

            modalPeriodOpenClose={this.props.modalPeriodOpenClose}
            updateNameCheckList={this.props.updateNameCheckList}
            updateCheckList={this.props.updateCheckList}
          />
          <ModalPeriodComponent
            checkList={this.props.checkList}

            modalPeriodOpenClose={this.props.modalPeriodOpenClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkList: state.checkList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      modalPeriodOpenClose,
      updateNameCheckList,
      updateCheckList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckListTitleComponentContainer );
