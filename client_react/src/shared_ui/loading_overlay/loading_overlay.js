import React, { PureComponent } from 'react';
import styles from './loading_overlay.module.css';

export class LoadingOverlay extends PureComponent {
  render() {
    return (
      <div className={styles.loading}>
        <div className={styles.spinnerWrapper}>
          <span className={styles.spinnerText}>LOADING</span>
          <span className={styles.spinner} />
        </div>
      </div>
    );
  }
}
