import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as queryString from 'query-string';

import IResetPasswordComponentContainerProps from '../componentContainerProps/resetPasswordComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { EnterLoginOrEmail } from '../components/resetPasswordForms/enterLoginOrEmail';
import { sendLoginOrEmail, sendNewPassword } from '../actions/resetPasswordAction';
import { EnterNewPassword } from '../components/resetPasswordForms/enterNewPassword';

class ResetPasswordComponentContainer extends React.Component<IResetPasswordComponentContainerProps, any> {
  sendNewPassword = ( newPassword: string ) => {
    const search: any = queryString.parse( this.props.location.search );

    this.props.sendNewPassword(
      search.UserId,
      search.Token,
      newPassword
    );
  };

  render() {
    return (
      <div className="reset-password-page-container">
        {!queryString.parse( this.props.location.search ).Token ?
          <EnterLoginOrEmail
            sendLoginOrEmail={this.props.sendLoginOrEmail}
          />
          :
          <EnterNewPassword
            sendNewPassword={this.sendNewPassword}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      sendLoginOrEmail,
      sendNewPassword,
    },
    dispatch
  );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( ResetPasswordComponentContainer );