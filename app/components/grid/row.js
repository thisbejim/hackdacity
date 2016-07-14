import React from 'react';

import styles from './grid.css';

export const Row = (props) => {
    return (
      <div className={styles.row}>
        {props.children}
      </div>
    )
}
