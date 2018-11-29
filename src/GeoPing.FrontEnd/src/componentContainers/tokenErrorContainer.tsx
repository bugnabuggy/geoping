import * as React from 'react';
import ITokenErrorContainerProps from '../componentContainerProps/tokenErrorContainerProps';
import { Card, CardBody } from 'reactstrap';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TokenErrorContainer extends React.Component<ITokenErrorContainerProps, any> {
  render() {
    return(
      <div className="token-page-container">
        <Card>
          <CardBody>
            <h1>Error verifying your token</h1>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkList: state.checkList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( TokenErrorContainer );