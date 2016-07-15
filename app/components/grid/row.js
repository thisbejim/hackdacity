import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

export const Row = (props) => {
  const rowClass = classNames(
    // row
    styles["row"],
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
    <div className={rowClass}>
      {props.children}
    </div>
  )
}

Row.propTypes = {
  hiddenLg: React.PropTypes.bool,
  hiddenMd: React.PropTypes.bool,
  hiddenSm: React.PropTypes.bool,
  hiddenXs: React.PropTypes.bool,
  hiddenLg: React.PropTypes.bool,
  hiddenMd: React.PropTypes.bool,
  hiddenSm: React.PropTypes.bool,
  hiddenXs: React.PropTypes.bool,
};
Row.defaultProps = {
  hiddenLg: false,
  hiddenMd: false,
  hiddenSm: false,
  hiddenXs: false,
  visibleLg: false,
  visibleMd: false,
  visibleSm: false,
  visibleXs: false,
};
