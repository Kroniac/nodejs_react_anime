import React, { PureComponent } from 'react';
import styles from './snackbar.module.css';

export class Snackbar extends PureComponent {
  state = {
    isActive: false,
  }

  message = '';

  openSnackBar = (message = 'Something went wrong...') => {
    this.message = message;
    this.setState({ isActive: true });
    setTimeout(() => {
      this.setState({ isActive: false });
    }, 3000);
  }

  render() {
    const { isActive } = this.state;
    return (
      <div className = {isActive ? [styles.snackbar, styles.show].join(' ') : styles.snackbar}>
        {this.message}
      </div>
    );
  }
}
