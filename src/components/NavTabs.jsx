import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

class NavTabs extends React.Component {

  constructor(props, context) {
    bootstrapUtils.addStyle(Nav, 'green-pills');
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
      <div>
        <style type="text/css">
          {`
            .nav-pills > li.active > a, .nav-pills > li.active > a:focus {
                color: white;
                background-color: #00AA00;
            }

            .nav-pills > li > a, .nav-pills > li > a:focus {
                color: #004400;
            }

            .nav-pills > li.active > a:hover {
                background-color: #00AA00;
                color: white;
            }
        `}
        </style>
        <Nav bsStyle="pills" activeKey={this.state.key} onSelect={this.handleSelect} stacked>
          <NavItem eventKey={1}>
            Announcements
          </NavItem>
          <NavItem eventKey={2}>
            Chitchat
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export { NavTabs };
