import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IPublicCheckListsComponentContainerProps
  from '../componentContainerProps/publicCheckListsComponentContainerProps';
import { PublicListsComponent } from '../components/publicListsComponent';
import { PaginationComponent } from '../components/paginationComponent';
import { changePagination, loadPublicLists } from '../actions/publicChecListAction';
import IinitialStateType from '../types/stateTypes/initialStateType';

class PublicCheckListsComponentContainer extends React.Component<IPublicCheckListsComponentContainerProps, any> {
  componentDidMount() {
    this.props.loadPublicLists();
  }

  render() {
    return (
      <React.Fragment>
        <PublicListsComponent
          publicListItem={this.props.publicListItem}
        />
        <div className="public-check-list-pagination-container">
          <PaginationComponent
            countPage={Number( this.props.countPages )}
            activePage={Number( this.props.actionPage )}
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
    publicListItem: state.publicCheckList.checkLists,
    countPages: state.publicCheckList.contPages,
    actionPage: state.publicCheckList.pageNumber,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadPublicLists,
      changePagination,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( PublicCheckListsComponentContainer );