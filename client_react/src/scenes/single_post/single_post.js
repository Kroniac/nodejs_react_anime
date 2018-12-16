import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Styles from './single_post.module.css';

import { SharedUI } from '../../config/import_paths';

export default class SinglePost extends Component {
  state = {
    data: {},
  }
  componentDidMount() {
    this._fetchPost();
  }

  _fetchPost = () => {
    const { match } = this.props;
    const fetchSinglePostUrl = `http://localhost:5000/feed/post/${match.params.postId}`;
    axios(fetchSinglePostUrl)
    .then((res) => {
      console.log(res);
      this.setState({ data: res.data.results })
    })
    .catch((err) => console.log(err));
  }
  render() {
    const { data } = this.state;
    return (
      <div className = {Styles.root}>
       <div>This is a single post</div>
       <div>{data.title}</div>
       <div>{data.content}</div>
       <div
        className="image"
        style={{
          backgroundImage: `url('${data.imageUrl}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      />
      </div>
    )
  }
}