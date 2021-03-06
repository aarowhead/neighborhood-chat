import React from 'react'
import { TitleBar } from './Titlebar.jsx'
import { NavTabs } from './NavTabs.jsx'
import { PostsLists } from './PostsList.jsx'
import { NewPost } from './NewPost.jsx'
import { LandingPage } from './LandingPage.jsx'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'
import firebase from '../firebase.js';

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTab: 1,
      announcements: [],
      chitchat: [],
      showLandingPage: true
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getCommentsInfo = this.getCommentsInfo.bind(this);
    this.getListPath = this.getListPath.bind(this);
    this.setListenerForPath = this.setListenerForPath.bind(this);
    this.getVisiblePosts = this.getVisiblePosts.bind(this);
    this.getHeaderText = this.getHeaderText.bind(this);
  }

  //TODO: use this
  getCommentsInfo(comments, updateComment) {
    var commentsWithUsers = [];
    const userPromises = [];
    for (let comment in comments) {
      const request = firebase.database().ref(`users/${comments[comment].user}`).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().screen_name) || 'Anonymous';
        updateComment({
          user: username,
          date: comments[comment].date,
          text: comments[comment].text
        })
      });
      userPromises.push(request)
    }
    return Promise.all(userPromises);
  }

  getAllPosts(snapshot, updateNewState) {
    var posts = snapshot.val();
    const postPromises = [];
    for (let post in posts) {
      postPromises.push(new Promise((resolve) => {
        firebase.database().ref(`users/${posts[post].user}`).once('value').then(function(snapshot) {
          var username = (snapshot.val() && snapshot.val().screen_name) || 'Anonymous';
          var updatedComments = [];
          this.getCommentsInfo(posts[post].comments, (comment) => {
            updatedComments.push(comment);
          }).then(() => {
            updateNewState({
              id: post,
              name: username,
              text: posts[post].text,
              likes: posts[post].likes,
              date: posts[post].date,
              user: posts[post].user,
              comments: updatedComments
            })
            resolve();
          });
        }.bind(this));
      }));
    }
    return Promise.all(postPromises)
  }

  getListPath() {
    if (this.state.currentTab == 1) {
      return 'announcements';
    }
    return 'chitchat';
  }

  getVisiblePosts() {
    if (this.state.currentTab == 1) {
      return this.state.announcements;
    }
    return this.state.chitchat;
  }

  setListenerForPath(path, updateState) {
    const itemsRef = firebase.database().ref(path);
    var newState = [];
    return itemsRef.on('value', (snapshot) => {
      newState = [];
      this.getAllPosts(snapshot, (post) => {
        newState.push(post)
      }).then(() => {
        //Sort posts so most recent post shows up at the top
        newState.sort((a, b) => ( b.date - a.date ))
        updateState(newState)
      });
    });
  }

  componentDidMount() {
    this.setListenerForPath('announcements', (announcementList) => {
      this.setState({
        currentTab: this.state.currentTab,
        announcements: announcementList,
        chitchat: this.state.chitchat,
        showLandingPage: this.state.showLandingPage
      })
    })
    this.setListenerForPath('chitchat', (chitchatList) => {
      this.setState({
        currentTab: this.state.currentTab,
        announcements: this.state.announcements,
        chitchat: chitchatList,
        showLandingPage: this.state.showLandingPage
      })
    })
  }

  getHeaderText() {
    if (this.state.currentTab == 1) {
      return 'Announcements';
    }
    return 'Chitchat';
  }

  render() {
      const showLandingPage = this.state.showLandingPage;

      if (showLandingPage) {
        return (
          <div>
             <TitleBar />
             <LandingPage on_button_click={() => this.setState({
               currentTab: this.state.currentTab,
               announcements: this.state.announcements,
               chitchat: this.state.chitchat,
               showLandingPage: false
             })}/>
           </div>
         )
      } else {
        return (
          <div>
            <div>
              <TitleBar />
               <Grid style={{ paddingTop: 70 }}>
                  <Row>
                    <Col md={2}>
                      <div class="affix" style={{ overflow: "hidden" }}>
                        <div style={{ width: 180 }}>
                          <img height={180} src="/images/WestJordanView.jpg" alt="thumbnail" />
                        </div>
                        <h3 style={{ marginTop: 5 }}>Fort Utah<br/>Neighborhood</h3>
                        <NavTabs on_tab_change={(newTab) => {
                            this.setState({
                              currentTab: newTab,
                              posts: this.state.posts
                            })
                            console.log(this.state.posts);
                          }}
                        />
                      </div>
                    </Col>
                    <Col md={10}>
                      <NewPost post_path={this.getListPath()}/>
                      <PostsLists post_path={this.getListPath()} posts={this.getVisiblePosts()}/>
                    </Col>
                  </Row>
                </Grid>
            </div>
          </div>
        )
   }
 }
};

export { Container };
