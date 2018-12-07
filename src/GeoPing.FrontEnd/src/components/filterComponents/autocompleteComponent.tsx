import * as React from 'react';
import IAutocompleteComponentProps from '../../componentProps/filterComponentProps/autocompleteComponentProps';
import { Badge, Input } from 'reactstrap';
import { IUsersDataList } from '../../types/stateTypes/sharedCheckListStateType';
import { debounce } from 'throttle-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

export class AutocompleteComponent extends React.Component<IAutocompleteComponentProps, any> {
  _debounce: any;

  constructor( props: IAutocompleteComponentProps ) {
    super( props );
    this.state = {
      focus: false,
      select: false,
      userNameForPill: '',
      mouseEvent: false,
      showAutocomplete: false,
    };
    this._debounce = debounce( 1000, this.autocomplite );
  }

  autocomplite = ( value: string, id: string, callBackAutocompleted: any ) => {
    callBackAutocompleted( value, id );
  };

  cancelSelectUser = () => {
    this.setState( {
      userNameForPill: '',
    } );
    const userData: IUsersDataList = {
      id: this.props.userData.id,
      identifier: '',
      autocompleteUsers: [],
    };
    this.props.changeUserData( userData );
  };
  onMouseEnter = () => {
    this.setState( {
      mouseEvent: true,

    } );
  };
  onMouseLeave = () => {
    this.setState( {
      mouseEvent: false,
    } );
  };
  handleClickItem = ( userName: string ) => {
    this.setState( {
      userNameForPill: userName,
      focus: false,
      showAutocomplete: false,
    } );
    const indexBracket = userName.indexOf( '(' );
    const userData: IUsersDataList = {
      id: this.props.userData.id,
      identifier: userName.substring( indexBracket + 1, userName.length - 1 ),
      autocompleteUsers: this.props.userData.autocompleteUsers,
    };
    this.props.changeUserData( userData );
  };
  handleFocus = () => {
    this.setState( {
      focus: true,
      showAutocomplete: true,
    } );
  };
  handleBlur = () => {
    if ( !this.state.mouseEvent ) {
      this.setState( {
        showAutocomplete: false,
      } );
    }
  };
  handleChange = ( e: any ) => {
    const userData: IUsersDataList = {
      id: this.props.userData.id,
      identifier: e.target.value,
      autocompleteUsers: this.props.userData.autocompleteUsers,
    };
    if ( this.state.focus && e.target.value.length > 2 ) {
      this._debounce( e.target.value, this.props.userData.id, this.props.getAutocompletedListUsers );
    }
    this.props.changeUserData( userData );
  };
  _renderAutocomplete = () => {
    return this.props.userData.autocompleteUsers.map( ( item, index: number ) => {
      return (
        <div
          key={item.userId}
          className="autocomplete-list-item cursor-pointer"
          onClick={() => {
            this.handleClickItem( ( item.fullName || item.userName ) + ` (${item.email})` );
          }}
          onBlur={this.handleBlur}
        >
          {item.fullName || item.userName} ( {item.email} )
        </div>
      );
    } );
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="autocomplete-container"
          onBlur={this.handleBlur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {!!this.state.userNameForPill ?
            (
              <Badge color="primary" pill={true}>
                <div className="autocomplete-pill-item">
                  {this.state.userNameForPill}
                  <div
                    className="autocomplete-pill-item-icon cursor-pointer"
                    onClick={this.cancelSelectUser}
                  >
                    <FontAwesomeIcon icon={timesCircleIcon}/>
                  </div>
                </div>
              </Badge>
            )
            :
            (
              <Input
                onChange={this.handleChange}
                onFocus={this.handleFocus}
              />
            )
          }
          {this.state.showAutocomplete && !!this.props.userData.autocompleteUsers.length &&
          <div className="autocomplete-list-container">
            {this._renderAutocomplete()}
          </div>
          }
        </div>
      </React.Fragment>
    );
  }
}