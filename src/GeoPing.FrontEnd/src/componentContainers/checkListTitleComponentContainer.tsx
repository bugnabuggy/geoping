import * as React from 'react';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CheckListHeadComponent } from '../components/checkListHeadComponent';
import ICheckListTitleComponentContainerProps from '../componentProps/checkListTitleComponentContainerProps';
import { changeNameCheckList } from '../actions/checkListAction';

class CheckListTitleComponentContainer extends React.Component<ICheckListTitleComponentContainerProps, any> {
  render() {
    return(
      <React.Fragment>
        <div className="check-list-head">
          <CheckListHeadComponent
            nameChecklist={this.props.nameChecklist}

            changeNameCheckList={this.props.changeNameCheckList}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    nameChecklist: state.checkList.nameChecklist,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    changeNameCheckList,
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( CheckListTitleComponentContainer );