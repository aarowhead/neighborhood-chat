import React from 'react'
import { TitleBar } from './Titlebar.jsx'
import { NavTabs } from './NavTabs.jsx'
import { PostsLists } from './PostsList.jsx'
import { NewPost } from './NewPost.jsx'
import { Grid, Row, Col } from 'react-bootstrap';

class Container extends React.Component {
  render() {
    return (
      <div>
        <TitleBar />
        <NavTabs />
        <NewPost />
        <PostsLists />
      </div>
    );
  }
}

export { Container };
