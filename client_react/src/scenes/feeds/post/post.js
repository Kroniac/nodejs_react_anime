import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom'
import Styles from './post.module.css';

export class Post extends PureComponent {
  _editPostHandler = () => {
    this.props.editPostHandler(this.props.post);
  }
  render() {
    const { post } = this.props;
    return (
      <div className = {Styles.card} >
        <label>{post.title}</label>
        <label>{post.content}</label>
        <div className = {Styles.actions}>
          <Link
            className = {Styles.link} 
            style = {{ marginRight: 3 }}        
            to = {{
              pathname: `/feeds/${post._id}`,
              state:{
                name:'Farid'
              }
          }}>
            View
          </Link>
          <button
            className = {Styles.link} 
            onClick = {this._editPostHandler}        
          >
            Edit
          </button>
        </div>
      </div>
    )
  }
}