import * as React from 'react';
import IEmailConfirmPageProps from '../pageProps/emailConfirmPageProps';
import { Alert } from 'reactstrap';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { confirmEmail } from '../actions/emailCongirmAction';

class EmailConfirmPage extends React.Component<IEmailConfirmPageProps, any> {
  componentDidMount() {
    const id: any = this.props.match.params.idUser;
    const token: any = this.props.match.params.token;
    this.props.confirmEmail( id, token );
  }

  render() {
    return (
      <div className="confirm-email-container">
        {this.props.window.isConfirmEmail &&
          <Alert color="success">
            Email Confirm
          </Alert>
        }
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    window: state.window,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      confirmEmail,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( EmailConfirmPage );
