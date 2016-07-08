import React from 'react';
import styles from './grid.css';

export class Container extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}
