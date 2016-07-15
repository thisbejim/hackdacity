import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

export const Column = (props) => {
  const columnClass = classNames(
    // column widths
    styles["colLg"+props.lg],
    styles["colMd"+props.md],
    styles["colSm"+props.sm],
    styles["colXs"+props.xs],
    // hidden
    props.hiddenLg ? styles["hiddenLg"] : null,
    props.hiddenSm ? styles["hiddenSm"]: null,
    props.hiddenSm ? styles["hiddenSm"]: null,
    props.hiddenXs ? styles["hiddenXs"] : null,
    // visible
    props.visibleLg ? styles["visibleLg"] : null,
    props.visibleSm ? styles["visibleSm"]: null,
    props.visibleSm ? styles["visibleSm"]: null,
    props.visibleXs ? styles["visibleXs"] : null
  );
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
  hiddenLg: React.PropTypes.bool,
  hiddenMd: React.PropTypes.bool,
  hiddenSm: React.PropTypes.bool,
  hiddenXs: React.PropTypes.bool,
  hiddenLg: React.PropTypes.bool,
  hiddenMd: React.PropTypes.bool,
  hiddenSm: React.PropTypes.bool,
  hiddenXs: React.PropTypes.bool,
};
Column.defaultProps = {
  lg: null,
  md: null,
  sm: null,
  xs: null,
  hiddenLg: false,
  hiddenMd: false,
  hiddenSm: false,
  hiddenXs: false,
  visibleLg: false,
  visibleMd: false,
  visibleSm: false,
  visibleXs: false,
};
