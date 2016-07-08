import React from 'react';

import styles from './grid.css';

export class Row extends React.Component {
  render() {
    return (
      <div className={styles.row}>
        {this.props.children}
      </div>
    )
  }
}
