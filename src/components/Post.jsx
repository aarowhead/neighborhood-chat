import React from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'
import firebase from '../firebase.js'
import { CommentField } from './CommentField.jsx';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      likes: props.likes,
      id: props.id,
      comments: []
    }
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  onLikeClick() {
    const db = firebase.database();
    db.ref(`posts/${this.state.id}`).update({ likes: this.state.likes + 1 });
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
        </Panel.Heading>
        <Panel.Body>
           <CommentField name={this.state.name} text={this.state.text}/>
        </Panel.Body>
        <div class="pull-right pt-5">
          <ButtonGroup>
            <Button onClick={() => this.onLikeClick()}>
              <span class="badge">{this.state.likes}</span> Like
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
