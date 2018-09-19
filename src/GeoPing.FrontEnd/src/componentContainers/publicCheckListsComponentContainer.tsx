import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IPublicCheckListsComponentContainerProps from '../componentProps/publicCheckListsComponentContainerProps';
import { PublicListsComponent } from '../components/publicListsComponent';
import { publicListItem } from '../mocks/publicListItemMock';
import { PaginationComponent } from '../components/paginationComponent';
import { changePagination } from '../actions/publicChecListAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class PublicCheckListsComponentContainer extends React.Component<IPublicCheckListsComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <PublicListsComponent
          publicListItem={this.props.publicListItem}
        />
        <div className="public-check-list-pagination-container">
          <PaginationComponent
            countPage={Number(this.props.countPages)}
            activePage={Number(this.props.actionPage)}
            disablePage={0}
            numberAdditionalPages={3}

            changePagination={this.props.changePagination}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    publicListItem: publicListItem,
    countPages: state.publicCheckList.contPages,
    actionPage: state.publicCheckList.pageNumber,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    changePagination,
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( PublicCheckListsComponentContainer );