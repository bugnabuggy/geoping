import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckListHeadComponent } from '../components/checkListHeadComponent';
import ICheckListTitleComponentContainerProps from '../componentContainerProps/checkListTitleComponentContainerProps';
import { modalPeriodOpenClose, updateNameCheckList } from '../actions/checkListAction';
import { ModalPeriodComponent } from '../components/modalComponents/checklist/modalPeriodComponent';

class CheckListTitleComponentContainer extends React.Component<ICheckListTitleComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="check-list-head">
          <CheckListHeadComponent
            nameChecklist={this.props.nameChecklist}

            modalPeriodOpenClose={this.props.modalPeriodOpenClose}
            updateNameCheckList={this.props.updateNameCheckList}
          />
          <ModalPeriodComponent
            isShowModal={this.props.isShowModal}

            modalPeriodOpenClose={this.props.modalPeriodOpenClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    nameChecklist: state.checkList.nameChecklist,
    isShowModal: state.checkList.isShowModal,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      modalPeriodOpenClose,
      updateNameCheckList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckListTitleComponentContainer );