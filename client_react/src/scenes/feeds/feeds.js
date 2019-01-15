import React, { Component } from 'react';
import Qs from 'qs';
import OpenSocket from 'socket.io-client';
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

  nextPage = 1;

  componentDidMount() {
    this._fetchFeedsData();
    const socket = OpenSocket('http://localhost:5000/');
    socket.on('posts', data => {
      if (data.action === 'create') {
        this._addPost(data.post);
      }
    })
  }

  _addPost = (post) => {
    console.log(post);
    if (this.nextPage - 1 === 1) {
      const updatedPosts = [...this.state.feedsData];
      updatedPosts.unshift(post);
      this.setState({ feedsData: updatedPosts });
    }
  }

  _fetchFeedsData = (page = 1) => {
    if (this.nextPage !== null) {
      const params = {
        page,
        pageSize: 2,
      }
      const urlParameters = Qs.stringify(params);
      const fetchUrl = `http://localhost:5000/feed/posts?${urlParameters}`;
      axios(fetchUrl)
        .then((res) => {
          console.log(res);
          this.nextPage = res.data.nextPage;
          if (page === 1) this.setState({ feedsData: res.data.results });
          else {
            const updatedFeedsData = [...this.state.feedsData, ...res.data.results];
            this.setState({ feedsData: updatedFeedsData });
          }
        })
        .catch((err) => console.log(err));
    } else console.log('no more data');
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

  _loadMoreHandler = () => {
    this._fetchFeedsData(this.nextPage);
  }

  render() {
    const { feedsData } = this.state;
    return (
      <div className = {Styles.root} >
        <Carasol />
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
        <section className= {Styles.newPost}>
          <Button mode="raised" design="accent" onClick={this._loadMoreHandler}>
            Load More
          </Button>
        </section>
      </div>
    )
  }
}


class Carasol extends Component {
  render() {
    return (
      <div className = {Styles.wrapper}>
      <div className = {Styles.carasolContainer}>
        <img
          className = {Styles.carasolImage}
          src = 'https://i.ytimg.com/vi/yxPhb2kCNMk/maxresdefault.jpg'
          alt = 'This is a'
        />
        <img
          className = {Styles.carasolImage}
          src = 'https://static.bandainamcoent.eu/high/black-clover/black-clover/00-page-setup/black-clover_title_top-visual_1920x912.jpg'
          alt = 'This is a'
        />
        <img
          className = {Styles.carasolImage}
          src = 'https://sirusgaming.com/wp-content/uploads/2018/04/black-clover-01.jpg'
          alt = 'This is a'
        />
      </div>
      </div>
    )
  }
}