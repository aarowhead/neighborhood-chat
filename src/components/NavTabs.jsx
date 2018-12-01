import React from 'react'
import { Nav, NavItem } from 'react-bootstrap';

function handleSelect(selectedKey) {
  alert(`selected ${selectedKey}`);
}

class NavTabs extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect} justified>
        <NavItem eventKey={1}>
          Announcements
        </NavItem>
        <NavItem eventKey={2}>
          Chitchat
        </NavItem>
      </Nav>
    );
  }
}

export { NavTabs };
