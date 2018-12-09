import React from 'react'
import { Button } from 'react-bootstrap'
import firebase from '../firebase.js';

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(postTextObject) {
    const itemsRef = firebase.database().ref(this.props.post_path);
    const date = new Date().valueOf()
    const post = {
      user: "12345",
      text: postTextObject.value,
      likes: 0,
      date: date
    }
    itemsRef.push(post);
    postTextObject.value = '';
  }

  //TODO: make this textarea keep newlines etc.
  render() {
    return (
      <div>
        <textarea type="text" id="newPostText" placeholder="Write an Announcment" rows="5" ref="newPost" className="form-control" />
        <div class="text-right">
          <Button onClick={() => this.handleClick(document.getElementById('newPostText')) }>Post</Button>
        </div>
      </div>
    );
  }
}

export { NewPost };
