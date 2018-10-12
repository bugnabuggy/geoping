import * as React from 'react';
import { ShareCheckListModalComponent } from '../components/modalComponents/checklist/shareCheckListModalComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalShare } from '../actions/myCheckListsAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import IShareCheckListModalComponentContainerProps
  from '../componentContainerProps/shareCheckListModalComponentContainerProps';

class ShareCheckListModalComponentContainer extends React.Component<IShareCheckListModalComponentContainerProps, any> {
  render() {

    return (
      <ShareCheckListModalComponent
        show={this.props.show}
        closeModalShare={this.props.closeModalShare}
      />
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    show: state.myCheckList.isShowModalShare,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      closeModalShare,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( ShareCheckListModalComponentContainer );