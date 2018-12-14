import React, { Component, Fragment } from 'react';
import { SharedUI } from '../../../config/import_paths';
import axios from 'axios';


const { Modal } = SharedUI.Modal();
const { Backdrop } = SharedUI.Backdrop();
const { AnimatedTextInput } = SharedUI.TextInput();

class FeedEdit extends Component {
  state = {
    title: '',
    content: '',
  }

  _onChangeTextHandler = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  _submitNewPostToServer = () => {
    const { title, content } = this.state;
    const postUrl = 'http://localhost:5000/feed/post';
    const reqConfig = {
      url: postUrl,
      method: 'POST',
   
      data: {
        title,
        content,
      },
    }

    axios(reqConfig)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.props.onCancelEdit} />
        <Modal
          title="New Post"
          acceptEnabled={true}
          onCancelModal={this.props.onCancelEdit}
          onAcceptModal={this._submitNewPostToServer}
          isLoading={this.props.loading}
        >
        <form>
        <AnimatedTextInput
          attrName = 'title'
          inputValue = {this.state.title}
          onChangeText = {this._onChangeTextHandler}
          title = 'Title'
        />
        <input
          type = 'file'
          name = 'File Picker'
          accept = 'image/*'
        />
        <AnimatedTextInput
          attrName = 'content'
          inputValue = {this.state.content}
          onChangeText = {this._onChangeTextHandler}
          title = 'Content'
        />
        </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
