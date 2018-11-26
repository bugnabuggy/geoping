import * as React from 'react';
import RegisterComponent from '../components/forms/register';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IRegisterComponentContainerProps from '../componentContainerProps/registerComponentContainerProps';
import { registrationUser } from '../actions/userAction';

class RegisterComponentContainer extends React.Component<IRegisterComponentContainerProps, any> {
  render() {
    return(
      <React.Fragment>
        <RegisterComponent
          registrationUser={this.props.registrationUser}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      registrationUser,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( RegisterComponentContainer );