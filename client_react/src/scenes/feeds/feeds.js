import React, { Component } from 'react';
import { SinglePost } from './single_post/single_post'
import { SharedUI } from '../../config/import_paths';
import axios from 'axios';
import Styles from './feeds.module.css';
import FeedEdit from './feed_edit/feed_edit';

const { Button } = SharedUI.Button();

export default class Feeds extends Component {
  state = {
    feedsData: [],
    isEditing: false,
    editPost: null,
  }

  componentDidMount() {
    this._fetchFeedsData();
  }

  _fetchFeedsData = () => {
    const fetchUrl = 'http://localhost:5000/feed/posts';
    axios(fetchUrl)
      .then((res) => {
        this.setState({
          feedsData: res.data.posts,
        })
      })
      .catch((err) => console.log(err));
  }

  _newPostHandler = () => {
    this.setState({
      isEditing: true,
    })
  }

  _cancelEditHandler = () => {
    this.setState({
      isEditing: false,
    })
  }
  render() {
    const { feedsData } = this.state;
    return (
      <div className = {Styles.root} >
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this._cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <Button mode="raised" design="accent" onClick={this._newPostHandler}>
          New Post
        </Button>
        {feedsData.map(post => (
          <SinglePost
            key = {post._id}
            post  = {post}
          />
        ))}
      </div>
    )
  }
}