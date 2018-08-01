import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { WishList } from '../wishaList';

import { getRecords, getSpecialty, sendNewUser } from '../../actions/wishListAction';

interface IWishListContainerProps {
  wishList: Array<any>;
  specialty: Array<any>;

  getRecords: () => void;
  getSpecialty: () => void;
  sendNewUser: (value: any) => void;
}

class WishListContainer extends React.Component<IWishListContainerProps, any> {
  render() {
    return (
      <div>
        <WishList
          wishList={this.props.wishList}
          specialty={this.props.specialty}

          getRecordsAction={this.props.getRecords}
          getSpecialtyAction={this.props.getSpecialty}
          sendNewUserAction={this.props.sendNewUser}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    wishList: state.wishList.users,
    specialty: state.wishList.specialty,
  };
};

const mapDispatchToProps = (dispath: any) =>
  bindActionCreators({
    getRecords,
    getSpecialty,
    sendNewUser,
  }, dispath);

export default connect(mapStateToProps, mapDispatchToProps)(WishListContainer);