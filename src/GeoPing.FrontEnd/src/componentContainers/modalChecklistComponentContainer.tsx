import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ModalCheckListFilterComponent } from '../components/modalComponents/checklist/modalCheckListFilterComponent';
import { ModalChecklistComponent } from '../components/modalComponents/checklist/modalChecklistComponent';
import { closeModalForCreateCheckList, createCheckList, closeFilterCheckLists } from '../actions/checkListAction';
import IModalChecklistComponentContainerProps from '../componentProps/modalChecklistComponentContainerProps';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class ModalChecklistComponentContainer extends React.Component<IModalChecklistComponentContainerProps, any> {

  render() {
    return (
      <React.Fragment>
        <ModalCheckListFilterComponent
          show={this.props.show}

          closeFilterCheckLists={this.props.closeFilterCheckLists}
        />
        <ModalChecklistComponent
          showModal={this.props.showModal}

          createCheckList={this.props.createCheckList}
          closeModalForCreateCheckList={this.props.closeModalForCreateCheckList}
          // openModalForCreateCheckList={this.props.openModalForCreateCheckList}
        />
        {this.props.idChecklist > 0 && <Redirect to={'/checklist'}/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    showModal: state.checkList.isShowModal,
    show: state.checkList.showFilterCheckList,
    idChecklist: state.checkList.idChecklist,
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      createCheckList,
      closeModalForCreateCheckList,
      closeFilterCheckLists
    },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ModalChecklistComponentContainer );