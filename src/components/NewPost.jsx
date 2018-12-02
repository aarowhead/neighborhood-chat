import React from 'react'
import { Button } from 'react-bootstrap'
import firebase from '../firebase.js';

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(postTextObject) {
    const itemsRef = firebase.database().ref('posts');
    const date = new Date().valueOf()
    const post = {
      name: "Testing",
      text: postTextObject.value,
      likes: 0,
      date: date
    }
    itemsRef.push(post);
    postTextObject.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" id="newPostText" placeholder="Write an Announcment" ref="newPost" className="form-control" />
        <div>
          <Button onClick={() => this.handleClick(document.getElementById('newPostText')) }>Post</Button>
        </div>
      </div>
    );
  }
}

export { NewPost };
