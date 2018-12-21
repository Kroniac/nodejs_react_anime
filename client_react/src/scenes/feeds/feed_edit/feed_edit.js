import React, { Component, Fragment } from 'react';
import { SharedUI, Libs } from '../../../config/import_paths';

const { Modal } = SharedUI.Modal();
const { Backdrop } = SharedUI.Backdrop();
const { AnimatedTextInput } = SharedUI.TextInput();

class FeedEdit extends Component {
  state = {
    title: this.props.selectedPost ? this.props.selectedPost.title : '',
    content: this.props.selectedPost ? this.props.selectedPost.content : '',
    image: this.props.selectedPost ? this.props.selectedPost.imageUrl : null,
  }

  constructor(props) {
    super(props);
    console.log('hello')
    console.log(props);
  }

  baseState = { ...this.state };

  _onChangeTextHandler = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  _onChangeFileHandler = (attrName, value, files) => {
    console.log(files)
    this.setState({ [attrName]: files[0] });
  }

  _onAcceptHandler = () => {
    const { title, content, image } = this.state;
    const post = {
      title, content, image,
    }
    this.props.onFinishEdit(post);
  }

  _onCancelModalHandler = () => {
    this.setState(this.baseState);
    this.props.onCancelEdit();
  }

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.props.onCancelEdit} />
        <Modal
          title="New Post"
          acceptEnabled={true}
          onCancelModal={this._onCancelModalHandler}
          onAcceptModal={this._onAcceptHandler}
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
