import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { CheckListHeadComponent } from '../components/checkListHeadComponent';
import ICheckListTitleComponentContainerProps from '../componentContainersProps/checkListTitleComponentContainerProps';
import { changeNameCheckList, modalPeriodOpenClose } from '../actions/checkListAction';
import { ModalPeriodComponent } from '../components/modalComponents/checklist/modalPeriodComponent';

class CheckListTitleComponentContainer extends React.Component<ICheckListTitleComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="check-list-head">
          <CheckListHeadComponent
            nameChecklist={this.props.nameChecklist}

            changeNameCheckList={this.props.changeNameCheckList}
            modalPeriodOpenClose={this.props.modalPeriodOpenClose}
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
      changeNameCheckList,
      modalPeriodOpenClose,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckListTitleComponentContainer );