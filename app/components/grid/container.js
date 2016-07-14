import React from 'react';
import styles from './grid.css';

export const Container = (props) => {
    return (
      <div className={styles.container}>
        {props.children}
      </div>
    )
}
