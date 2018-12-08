import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import Styles from './single_post.module.css';

export class SinglePost extends PureComponent {
 constructor(props) {
   super(props);
   console.log(this.props);
 }
  render() {
    const { post } = this.props;
    return (
      <div className = {Styles.card} >
        <label>{post.title}</label>
        <label>{post.content}</label>
      </div>
    )
  }
}