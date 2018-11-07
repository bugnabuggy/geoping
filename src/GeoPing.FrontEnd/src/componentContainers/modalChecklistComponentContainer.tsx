import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ModalCheckListFilterComponent } from '../components/modalComponents/checklist/modalCheckListFilterComponent';
import { ModalChecklistComponent } from '../components/modalComponents/checklist/modalChecklistComponent';
import { closeFilterCheckLists, closeModalForCreateCheckList, createCheckList } from '../actions/checkListAction';
import IModalChecklistComponentContainerProps from '../componentContainerProps/modalChecklistComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { checkListUrl } from '../constants/routes';

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
        {this.props.isRedirect &&
        <Redirect push={true} to={checkListUrl.replace( '([a-z0-9-]+)', this.props.idChecklist )}/>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    showModal: state.checkList.isShowModal,
    show: state.checkList.showFilterCheckList,
    idChecklist: state.checkList.selectedGeoList.id,
    isRedirect: state.myCheckList.isRedirect,
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