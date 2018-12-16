import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom'
import Styles from './post.module.css';

export class Post extends PureComponent {
  render() {
    const { post } = this.props;
    return (
      <div className = {Styles.card} >
        <label>{post.title}</label>
        <label>{post.content}</label>
        <Link
          className = {Styles.link}         
          to = {{
            pathname: `/feeds/${post._id}`,
            state:{
              name:'Farid'
            }
        }} />
      </div>
    )
  }
}