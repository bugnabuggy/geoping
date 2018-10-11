import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ModalChecklistComponent } from '../components/modalComponents/checklist/modalChecklistComponent';
import { closeModalForCreateCheckList, createCheckList } from '../actions/checkListAction';
import IModalChecklistComponentContainerProps from '../componentProps/modalChecklistComponentContainerProps';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class ModalChecklistComponentContainer extends React.Component<IModalChecklistComponentContainerProps, any> {

  render() {
    return (
      <React.Fragment>
        <ModalChecklistComponent
          showModal={this.props.showModal}

          createCheckList={this.props.createCheckList}
          closeModalForCreateCheckList={this.props.closeModalForCreateCheckList}
          // openModalForCreateCheckList={this.props.openModalForCreateCheckList}
        />
        {this.props.idChecklist !== '' && <Redirect to={'/checklist'}/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    showModal: state.checkList.isShowModal,
    idChecklist: state.checkList.idChecklist,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      // openModalForCreateCheckList,
      createCheckList,
      closeModalForCreateCheckList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( ModalChecklistComponentContainer );