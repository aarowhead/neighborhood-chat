import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Post } from './Post.jsx'
import firebase from '../firebase.js';

class PostsLists extends React.Component {

  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('posts');
    itemsRef.on('value', (snapshot) => {
      let posts = snapshot.val();
      let newState = [];
      for (let post in posts) {
        newState.push({
          id: post,
          name: posts[post].name,
          text: posts[post].text,
          likes: posts[post].likes
        });
      }
      this.setState({
        posts: newState
      });
    });
  }

  render() {
    return (
      <ListGroup componentClass="ul">
          {this.state.posts.map((post) => {
            return (
              <Post id={post.id} name={post.name} text={post.text} likes={post.likes}/>
            )
          })}
      </ListGroup>
    );
  }
}

export { PostsLists };
