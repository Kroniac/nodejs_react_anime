import React, { Component } from 'react';
import { SinglePost } from './single_post/single_post'
import axios from 'axios';
import Styles from './feeds.module.css';

export default class Feeds extends Component {
  state = {
    feedsData: [],
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
  render() {
    const { feedsData } = this.state;
    return (
      <div className = {Styles.root} >
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