import React from 'react'
import { Nav, NavItem } from 'react-bootstrap';

class NavTabs extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: 1
    };
  }

  handleSelect(selectedKey) {
    this.props.on_tab_change(selectedKey);
    this.setState({ key: selectedKey });
  }

  render() {
    return (
      <Nav bsStyle="pills" activeKey={this.state.key} onSelect={this.handleSelect} justified>
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
