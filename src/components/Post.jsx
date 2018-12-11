import React from 'react'
import { Panel, Button, ButtonGroup, ListGroup, ListGroupItem, Media, Well } from 'react-bootstrap'
import firebase from '../firebase.js'
import { CommentField } from './CommentField.jsx';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false
    }
    this.getImagePath = this.getImagePath.bind(this)
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

  getImagePath(screen_name) {
    if (screen_name === "Aaron Hill") {
      return "/images/OregonWaterfallPic.jpg";
    } else if (screen_name === "Maria Santos") {
      return "/images/user1.jpg";
    } else if (screen_name === "Sabrina Adams") {
      return "/images/user2.jpg";
    } else if (screen_name === "Phil Uhl") {
      return "/images/user3.jpg";
    } else {
      return "/images/avatar.jpg";
    }
  }

  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading style={{ paddingBottom: 0 }}>
            <Media>
              <Media.Left align="center">
                <img width={32} height={32} src={this.getImagePath(this.props.name)} alt="thumbnail" />
              </Media.Left>
              <Media.Body>
                <Media.Heading style={{ marginBottom: 0, fontSize: 15 }}>{this.props.name}</Media.Heading>
                  <p class="text-muted" style={{ fontSize: 12 }}>
                    {new Date(this.props.date).toLocaleString()}
                  </p>
              </Media.Body>
            </Media>
          </Panel.Heading>
          <Panel.Body>
            {this.props.text}
            <div class="text-right">
              <ButtonGroup bsSize="xsmall" style={{ margin: 0 }}>
                <Button onClick={() => this.onLikeClick()}>
                  <span class="badge">{this.props.likes}</span> Like
                </Button>
                <Button onClick={() => this.setState({ open: !this.state.open })}>
                  <span class="badge">{this.props.comments.length}</span> View/Add Comments
                </Button>
              </ButtonGroup>
            </div>
          </Panel.Body>
          <Panel id={"collapsiblePanel" + this.props.id} expanded={this.state.open} style={{ margin: 0, border: 0 }}>
            <Panel.Collapse>
              <Panel.Body>
                <ListGroup>
                  {this.props.comments.sort((a, b) => a.date - b.date ).map((comment) => {
                    return (
                      <div>
                        <ListGroupItem style={{ border: 0, paddingRight: 0, paddingBottom: 0 }}>
                          <p style={{ margin: 0 }}>
                            {comment.user} <small class="text-muted"> {new Date(comment.date).toLocaleString()} </small>
                          </p>
                          <Well style={{ marginBottom: 0, padding: 5 }}>
                            {comment.text}
                          </Well>
                        </ListGroupItem>
                      </div>
                    )
                  })}
                  <ListGroupItem style={{ border: 0, paddingRight: 0 }}>
                    <textarea type="text" id={"newComment" + this.props.id} placeholder="Comment" ref="newComment" className="form-control" />
                    <div class="text-right">
                      <Button onClick={() => this.onPostCommentClick(document.getElementById("newComment" + this.props.id)) }>Add Comment</Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Panel>
      </div>
    );
  }
}

export { Post };
