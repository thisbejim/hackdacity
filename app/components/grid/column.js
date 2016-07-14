import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

export const Column = (props) => {
    const columnClass = classNames(styles["colLg"+props.lg],
    styles["colMd"+props.md], styles["colSm"+props.sm],
    styles["colXs"+props.xs]);
    return (
      <div className={columnClass}>
        {props.children}
      </div>
    )
}
Column.propTypes = {
  lg: React.PropTypes.number,
  md: React.PropTypes.number,
  sm: React.PropTypes.number,
  xs: React.PropTypes.number,
};
Column.defaultProps = {
  lg: null,
  md: null,
  sm: null,
  xs: null,
};
