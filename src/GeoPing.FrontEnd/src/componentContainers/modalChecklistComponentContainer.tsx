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
  constructor( props: IModalChecklistComponentContainerProps ) {
    super( props );
    this.state = {
      isRedirect: false,
    };
  }

  componentDidUpdate( prevProps: IModalChecklistComponentContainerProps ) {
    if ( this.props.idChecklist && prevProps.idChecklist !== this.props.idChecklist ) {
      this.setState( {
        isRedirect: true,
      } );
    }
  }

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
        {this.state.isRedirect && <Redirect push={true} to={checkListUrl.replace( ':id', this.props.idChecklist )}/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    showModal: state.checkList.isShowModal,
    show: state.checkList.showFilterCheckList,
    idChecklist: state.checkList.id,
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