import React from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'
import firebase from '../firebase.js'
import { CommentField } from './CommentField.jsx';

class Post extends React.Component {

  onLikeClick() {
    const db = firebase.database();
    db.ref(`posts/${this.props.id}`).update({ likes: this.props.likes + 1 });
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
        </Panel.Heading>
        <Panel.Body>
           <CommentField name={this.props.name} text={this.props.text} date={this.props.date}/>
        </Panel.Body>
        <div class="pull-right pt-5">
          <ButtonGroup>
            <Button onClick={() => this.onLikeClick()}>
              <span class="badge">{this.props.likes}</span> Like
            </Button>
            <Button>
              Comment
            </Button>
          </ButtonGroup>
        </div>
      </Panel>
    );
  }
}

export { Post };
