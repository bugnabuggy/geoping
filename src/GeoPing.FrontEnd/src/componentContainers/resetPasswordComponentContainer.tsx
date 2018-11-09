import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IResetPasswordComponentContainerProps from '../componentContainerProps/resetPasswordComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { EnterLoginOrEmail } from '../components/resetPasswordForms/enterLoginOrEmail';
import { sendLoginOrEmail, sendNewPassword } from '../actions/resetPasswordAction';
import { EnterNewPassword } from '../components/resetPasswordForms/enterNewPassword';

export class ResetPasswordComponentContainer extends React.Component<IResetPasswordComponentContainerProps, any> {
  render() {
    return (
      <div className="reset-password-page-container">
        {true ?
          <EnterLoginOrEmail
            sendLoginOrEmail={this.props.sendLoginOrEmail}
          />
          :
          <EnterNewPassword
            sendNewPassword={this.props.sendNewPassword}
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
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ResetPasswordComponentContainer );