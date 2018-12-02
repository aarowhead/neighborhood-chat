import React from 'react'
import { Media } from 'react-bootstrap';

class CommentField extends React.Component {

  constructor(props) {
    super(props);
    var date = new Date(props.date)
    this.state = {
      dateString: date.toLocaleString()
    }
  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src="/images/avatar.jpg" alt="thumbnail" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.name}</Media.Heading>
            <p class="text-muted">
              {this.state.dateString}
            </p>
            <p>
              {this.props.text}
            </p>
        </Media.Body>
      </Media>
    );
  }
}

export { CommentField };
