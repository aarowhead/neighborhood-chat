import React from 'react'
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class TitleBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop style={{ backgroundColor: "#006600", borderColor: "#006600", borderRadius: 0 }}>
        <Navbar.Header>
          <Navbar.Brand>
            <a style={{ color: "#FFFFFF" }}>Neighborhood Chat</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Find Neighborhood" />
            </FormGroup>{' '}
            <Button style={{ color: "#FFFFFF", backgroundColor: "#00AA00", borderColor: "#00AA00" }}>Search</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export { TitleBar };
