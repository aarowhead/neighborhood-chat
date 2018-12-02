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
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('posts');
    itemsRef.on('value', (snapshot) => {
      var posts = snapshot.val();
      var newState = [];
      for (let post in posts) {
        newState.push({
          id: post,
          name: posts[post].name,
          text: posts[post].text,
          likes: posts[post].likes,
          date: posts[post].date
        });
      };
      newState.sort((a, b) => ( b.date - a.date ))
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
              <Post id={post.id} name={post.name} text={post.text} likes={post.likes} date={post.date}/>
            )
          })}
      </ListGroup>
    );
  }
}

export { PostsLists };
