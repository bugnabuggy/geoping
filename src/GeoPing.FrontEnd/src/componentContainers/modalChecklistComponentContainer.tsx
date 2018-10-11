import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ModalChecklistComponent } from '../components/modalComponents/checklist/modalChecklistComponent';
import { closeModalForCreateCheckList, createCheckList } from '../actions/checkListAction';
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
    if ( prevProps.idChecklist !== this.props.idChecklist ) {
      this.setState( {
        isRedirect: true,
      } );
    }
  }

  render() {
    return (
      <React.Fragment>
        <ModalChecklistComponent
          showModal={this.props.showModal}

          createCheckList={this.props.createCheckList}
          closeModalForCreateCheckList={this.props.closeModalForCreateCheckList}
          // openModalForCreateCheckList={this.props.openModalForCreateCheckList}
        />
        {this.state.isRedirect && <Redirect push={true} to={checkListUrl}/>}
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