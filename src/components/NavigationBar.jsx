import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Neighborhood Chat</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
             Announcements
          </NavItem>
          <NavItem eventKey={2} href="#">
            Chitchat
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export { Header };
