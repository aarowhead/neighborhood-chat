import React from 'react'
import { Panel, Button, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap'
import firebase from '../firebase.js'
import { CommentField } from './CommentField.jsx';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  onLikeClick() {
    const db = firebase.database();
    db.ref(`${this.props.post_path}/${this.props.id}`).update({ likes: this.props.likes + 1 });
  }

  onPostCommentClick(postCommentObject) {
    console.log(this.props.post_path);
    const commentRef = firebase.database().ref(`${this.props.post_path}/${this.props.id}/comments`);
    const date = new Date().valueOf();
    const comment = {
      user: "12345",
      text: postCommentObject.value,
      date: date
    }
    commentRef.push(comment);
    postCommentObject.value = '';
  }

  render() {
    return (
      <div>
        <Panel style={{ marginBottom: 0 }}>
          <Panel.Body>
             <CommentField name={this.props.name} text={this.props.text} date={this.props.date}/>
          </Panel.Body>
          <Panel.Footer>
          <div class="text-right">
            <ButtonGroup bsSize="xsmall">
              <Button onClick={() => this.onLikeClick()}>
                <span class="badge">{this.props.likes}</span> Like
              </Button>
              <Button onClick={() => this.setState({ open: !this.state.open })}>
                <span class="badge">{this.props.comments.length}</span> View/Add Comments
              </Button>
            </ButtonGroup>
          </div>
          </Panel.Footer>
        </Panel>
        <Panel id={"collapsiblePanel" + this.props.id} expanded={this.state.open} style={{ marginTop: 0 }}>
          <Panel.Collapse>
            <Panel.Body>
            <ListGroup>
              {this.props.comments.sort((a, b) => a.date - b.date ).map((comment) => {
                return (
                  <div>
                    <ListGroupItem header={comment.user}>
                      <p class="text-muted">
                        {new Date(comment.date).toLocaleString()}
                      </p>
                      <p>
                        {comment.text}
                      </p>
                    </ListGroupItem>
                  </div>
                )
              })}
              <div>
                <textarea type="text" id={"newComment" + this.props.id} placeholder="Comment" ref="newComment" className="form-control" />
                <div class="text-right">
                  <Button onClick={() => this.onPostCommentClick(document.getElementById("newComment" + this.props.id)) }>Add Comment</Button>
                </div>
              </div>
            </ListGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export { Post };
