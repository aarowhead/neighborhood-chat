import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Post } from './Post.jsx';

class PostsLists extends React.Component {

  render() {
    return (
      <ListGroup componentClass="ul">
          {this.props.posts.map((post) => {
            return (
              <Post id={post.id} name={post.name} text={post.text} likes={post.likes} date={post.date} comments={post.comments} post_path={this.props.post_path}/>
            )
          })}
      </ListGroup>
    );
  }
}

export { PostsLists };
