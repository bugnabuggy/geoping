import * as React from 'react';
import ITokenPageContainerProps from '../componentContainerProps/tokenPageContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { verifyToken } from '../actions/tokenAction';

class TokenPageContainer extends React.Component<ITokenPageContainerProps, any> {
  componentDidMount() {
    this.props.verifyToken(this.props.match.params.token, this.props.userId);
  }

  render() {
    return(
      <div className="token-page-container">
        <Card>
          <CardBody>
            <h1>Please wait we verifying your token</h1>
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
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      verifyToken,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( TokenPageContainer );