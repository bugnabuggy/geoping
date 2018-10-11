import * as React from 'react';
import { Link } from 'react-router-dom';
import ILinkHeaderComponentProps from '../componentProps/headerComponentProps/linkHeaderComponentProps';
import { ERoleUser } from '../types/stateTypes/userStateType';

export class LinkHeaderComponent extends React.Component<ILinkHeaderComponentProps, any> {
  constructor( props: any ) {
    super ( props );
    this.state = {
      isDropdownAction: false,
    };
  }

  renderLinks = ( props: any ) => {
    const action: boolean = this.props.index === props.id;
    let elements: any;
    if ( props.isAdmin ) {
      elements = this.props.roleUser === ERoleUser.Admin ?
        (
          <Link
            id={props.id}
            to={props.path}
            className={`nav-link ${ action && ' active '} ${this.props.classLink}`}
          >
            {props.text}
          </Link>
        ) :
        null;
    } else {
      elements = (
        <Link
          id={props.id}
          to={props.path}
          className={`nav-link ${ action && ' active '} ${this.props.classLink}`}
        >
          {props.text}
        </Link>
      );
    }

    return elements;
  };

  renderDropdownLinks = () => {
    const elements: Array<any> = this.props.links.map ( ( item: any, index: number ) => {
      const key: string = `${index}_dropdownLinks`;
      return (
        <React.Fragment key={key}>
          {this.renderLinks ( item )}
        </React.Fragment>
      );
    } );
    return elements;
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.dropdown ? (
            <li className="nav-item">
              {this.renderLinks ( this.props )}
            </li>
          )
          :
          (
            <li className="nav-item ">
              <Link
                to="#"
                className={`nav-link dropdown-toggle ${this.state.isDropdownAction && 'action'}`}
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.text}
              </Link>
              <div className="dropdown-menu">
                {this.renderDropdownLinks ()}
              </div>
            </li>
          )
        }
      </React.Fragment>
    );
  }
}
