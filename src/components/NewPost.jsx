import React from 'react'
import { Button, Panel, Media } from 'react-bootstrap'
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
        <style type="text/css">
          {`
            .btn-primary {
              background-color: #00AA00;
              color: white;
              border-color: #00AA00;
            }

            .btn-primary:hover {
              background-color: #004400;
              color: white;
              border-color: #004400;
            }
        `}
        </style>
        <div style={{ marginTop: 0, marginBottom: 10 }}>
          <Panel>
            <Panel.Heading style={{ paddingBottom: 0 }}>
              <Media>
                <Media.Left align="center">
                  <img width={32} height={32} src="/images/OregonWaterfallPic.jpg" alt="thumbnail" />
                </Media.Left>
                <Media.Body>
                  <Media.Heading style={{ marginBottom: 0, fontSize: 15 }}>Aaron Hill</Media.Heading>
                    <p class="text-muted" style={{ fontSize: 12 }}>
                      Now
                    </p>
                </Media.Body>
              </Media>
            </Panel.Heading>
            <Panel.Body>
              <textarea type="text" id="newPostText" placeholder="Write a post" rows="3" ref="newPost" className="form-control" />
              <div class="text-right" style={{ marginTop: 5 }}>
                <Button bsStyle="primary" onClick={() => this.handleClick(document.getElementById('newPostText')) }>Post</Button>
              </div>
            </Panel.Body>
          </Panel>
        </div>
      </div>
    );
  }
}

export { NewPost };
