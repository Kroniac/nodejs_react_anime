import React from 'react';
import ReactDOM from 'react-dom';

import './backdrop.css';

export const Backdrop = props =>
  (
    <div
      className={['backdrop', props.open ? 'open' : ''].join(' ')}
      onClick={props.onClick}
    />
  );
