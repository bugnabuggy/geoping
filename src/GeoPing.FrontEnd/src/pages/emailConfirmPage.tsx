import * as React from 'react';
import IEmailConfirmPageProps from '../pageProps/emailConfirmPageProps';
import { Button } from 'reactstrap';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { confirmEmail } from '../actions/emailCongirmAction';
import * as queryString from 'query-string';
import { isRedirect } from '../actions/windowAction';
import { dashboardUrl, loginUrl } from '../constants/routes';

class EmailConfirmPage extends React.Component<IEmailConfirmPageProps, any> {
  componentDidMount() {
    const search: any = queryString.parse( this.props.location.search );
    this.props.confirmEmail( search.UserId, search.Token );
  }

  handleClick = () => {
    const redirect: string = this.props.user.authorized ? dashboardUrl : loginUrl;
    this.props.isRedirect( redirect );
  };

  render() {
    return (
      <div className="confirm-email-container">
        {this.props.window.isConfirmEmail &&
        ( <Button
          onClick={this.handleClick}
          color="primary"
        >
          {this.props.user.authorized ? 'go to dashboard' : 'login'}
        </Button> )
        }
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    window: state.window,
    user: state.user,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      confirmEmail,
      isRedirect,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( EmailConfirmPage );
