import React, { Component, Fragment } from 'react';
import { SharedUI, Libs } from '../../../config/import_paths';
import axios from 'axios';

const { GenerateBase64FromImage } = Libs.Utils();

const { Modal } = SharedUI.Modal();
const { Backdrop } = SharedUI.Backdrop();
const { AnimatedTextInput } = SharedUI.TextInput();

class FeedEdit extends Component {
  state = {
    title: '',
    content: '',
    image: null,
  }

  _onChangeTextHandler = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  _onChangeFileHandler = (attrName, value, files) => {
    console.log(files)
    this.setState({ [attrName]: files[0] });
  }

  _submitNewPostToServer = () => {
    const { title, content, image } = this.state;
    const postUrl = 'http://localhost:5000/feed/post';
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    const reqConfig = {
      url: postUrl,
      method: 'POST',
      data: formData,
    }

    axios(reqConfig)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
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
          onChange = {(e) => this._onChangeFileHandler('image', e.target.value, e.target.files)}
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
