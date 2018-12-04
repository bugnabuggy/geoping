import * as React from 'react';
import ITokenPageContainerProps from '../componentContainerProps/tokenPageContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { verifyToken } from '../actions/tokenAction';

class TokenPageContainer extends React.Component<ITokenPageContainerProps, any> {

  componentDidUpdate( prevProps: Readonly<ITokenPageContainerProps>, prevState: Readonly<any>, snapshot?: any ): void {
    if ( !prevProps.userId && this.props.userId ) {
      this.props.verifyToken( this.props.match.params.token, this.props.userId );
    }
  }

  render() {
    return (
      <div className="token-page-container">
        <Card>
          <CardBody>
            <h1>{this.props.shared.messageForActivateToken}</h1>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkList: state.checkList,
    userId: state.user.userId,
    shared: state.sharedCheckList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      verifyToken,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( TokenPageContainer );
