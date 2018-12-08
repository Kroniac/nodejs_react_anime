import React from 'react';
import ReactDOM from 'react-dom';
import { SharedUI } from '../../config/import_paths'
import './modal.css';

const { Button } = SharedUI.Button();

export const Modal = props => (
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        <Button design="danger" mode="flat" onClick={props.onCancelModal}>
          Cancel
        </Button>
        <Button
          mode="raised"
          onClick={props.onAcceptModal}
          disabled={!props.acceptEnabled}
          loading={props.isLoading}
        >
          Accept
        </Button>
      </div>
    </div>
  );
