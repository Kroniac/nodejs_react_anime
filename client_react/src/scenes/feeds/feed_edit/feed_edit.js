import React, { Component, Fragment } from 'react';
import { SharedUI } from '../../../config/import_paths';

const { Modal } = SharedUI.Modal();
const { Backdrop } = SharedUI.Backdrop();

class FeedEdit extends Component {

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.props.onCancelEdit} />
        <Modal
          title="New Post"
          acceptEnabled={true}
          onCancelModal={this.props.onCancelEdit}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        >
        <label>Hello</label>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
