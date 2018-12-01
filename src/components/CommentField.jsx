import React from 'react'
import { Media } from 'react-bootstrap';

class CommentField extends React.Component {
  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src="/images/avatar.jpg" alt="thumbnail" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.name}</Media.Heading>
            <p>
              {this.props.text}
            </p>
        </Media.Body>
      </Media>
    );
  }
}

export { CommentField };
