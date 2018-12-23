import React, { Component } from 'react';
import { Post } from './post/post'
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
        console.log(res);
        this.setState({
          feedsData: res.data.results,
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
    this.setState({ isEditing: false, editPost: null });
  }

  _editPostHandler = (post) => {
    console.log(post);
    this.setState({ isEditing: true, editPost: post });
  }

  _submitNewPostToServer = (post) => {
    const postUrl = 'http://localhost:5000/feed/post';
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('image', post.image);
    const reqConfig = {
      url: postUrl,
      method: 'POST',
      data: formData,
    }
    if (this.state.editPost) {
      reqConfig.url = 'http://localhost:5000/feed/post/' + this.state.editPost._id;
      reqConfig.method = 'PUT';
    }
    axios(reqConfig)
      .then((res) => {
        const updatedFeedsData = [...this.state.feedsData]
        if (this.state.editPost) {
          const postIndex = updatedFeedsData.findIndex(p => p._id === this.state.editPost._id);
          updatedFeedsData[postIndex] = res.data.post;
        } else updatedFeedsData.push(res.data.post);
        this.setState({ feedsData: updatedFeedsData });
        this.setState({ isEditing: false, editPost: null })
      })
      .catch((err) => console.log(err.response));
  }

  _deletePostHandler = (post, rowIndex) => {
    const postUrl = 'http://localhost:5000/feed/post/' + post._id;
    const reqConfig = {
      url: postUrl,
      method: 'DELETE',
    }
    axios(reqConfig)
      .then((res) => {
        const updatedFeedsData = [...this.state.feedsData];
        updatedFeedsData.splice(rowIndex, 1);
        this.setState({ feedsData: updatedFeedsData });
        
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    const { feedsData } = this.state;
    return (
      <div className = {Styles.root} >
        {this.state.isEditing ? (
          <FeedEdit
            editing={this.state.isEditing}
            selectedPost={this.state.editPost}
            loading={this.state.editLoading}
            onCancelEdit={this._cancelEditHandler}
            onFinishEdit={this._submitNewPostToServer}
          />
        ) : null}
        <section className= {Styles.newPost}>
        <Button mode="raised" design="accent" onClick={this._newPostHandler}>
          New Post
        </Button>
        </section>
        {feedsData.map((post, rowIndex) => (
          <Post
            key = {post._id}
            post  = {post}
            rowIndex = {rowIndex}
            editPostHandler = {this._editPostHandler}
            deletePostHandler = {this._deletePostHandler}
          />
        ))}
      </div>
    )
  }
}