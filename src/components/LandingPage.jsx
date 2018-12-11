import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap';

class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <style type="text/css">
          {`
            .btn-primary {
              background-color: #00AA00;
              color: white;
              border-color: #00AA00;
              height: 60px;
              width: 200px;
              font-size: 16pt;
            }

            .btn-primary:hover {
              background-color: #004400;
              color: white;
              border-color: #004400;
            }
        `}
        </style>
        <div style={{ backgroundImage: "url(../images/SanFransiscoNeighborhood.jpg)", backgroundSize: "100%", height: "100vh" }}>
          <Jumbotron style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 200,
              textAlign: "center"
            }}>
            <h1>Welcome!</h1>
            <p>
              Connect with others in your neighborhood!
            </p>
            <p>
              <Button bsStyle="primary" onClick={this.props.on_button_click}>Get Started</Button>
            </p>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export { LandingPage };
