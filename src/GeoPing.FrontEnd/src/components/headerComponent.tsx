import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import IHeaderComponentProps from '../componentProps/headerComponentProps/headerComponentProps';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import {
  adminDashboardUrl,
  baseUrl,
  checkInUrl,
  dashboardUrl,
  loginUrl,
  logOutUrl,
  profileUrl,
  publicCheckListUrl,
  registerUrl
} from '../constants/routes';
import { ERoleUser } from '../types/stateTypes/userStateType';

export class HeaderComponent extends React.Component<IHeaderComponentProps, any> {
  handleToggle = () => {
    this.setState( {
      showMenu: !this.state.showMenu,
    } );
  };

  constructor( props: any ) {
    super( props );
    this.state = ( {
      showMenu: false,
    } );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="light" light={true} expand="md">
          <NavbarBrand><h3>Geo Ping</h3></NavbarBrand>
          <NavbarToggler onClick={this.handleToggle}/>
          {this.props.userAuthorization ? (
              <Collapse navbar={true} isOpen={this.state.showMenu}>
                <Nav className="ml-auto" navbar={true}>
                  <NavItem>
                    <LinkContainer exact={true} to={dashboardUrl}>
                      <NavLink>Dashboard</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer exact={true} to={checkInUrl}>
                      <NavLink>Check in</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer exact={true} to={baseUrl}>
                      <NavLink>About</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <UncontrolledDropdown nav={true} inNavbar={true}>
                    <DropdownToggle nav={true} caret={true}>%username%</DropdownToggle>
                    <DropdownMenu right={true}>
                      <ul>
                        <NavItem>
                          <Link to={profileUrl} className="nav-link">Profile</Link>
                        </NavItem>
                        {this.props.roleUser === ERoleUser.Admin ?
                          (
                            <NavItem>
                              <Link to={adminDashboardUrl} className="nav-link">Admin Dashboard</Link>
                            </NavItem>
                          )
                          :
                          null}
                        <DropdownItem divider={true}/>
                        <NavItem>
                          <Link to={logOutUrl} className="nav-link">Sign out</Link>
                        </NavItem>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <img src="/assets/images/avatar.png" width="50px" height="50px" className="rounded-circle"/>
              </Collapse>
            )
            :
            (
              <Collapse navbar={true} isOpen={this.state.showMenu}>
                <Nav className="ml-auto" navbar={true}>
                  <NavItem>
                    <LinkContainer exact={true} to={publicCheckListUrl}>
                      <NavLink name="public">Public checklists</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer exact={true} to={baseUrl}>
                      <NavLink>About</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer exact={true} to={loginUrl}>
                      <NavLink>Sign in</NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer exact={true} to={registerUrl}>
                      <NavLink>Sign up</NavLink>
                    </LinkContainer>
                  </NavItem>
                </Nav>
              </Collapse>
            )}
        </Navbar>
      </React.Fragment>
    );
  }
}
