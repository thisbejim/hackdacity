import React from 'react';

import styles from './grid.css';

import classNames from 'classnames';

export class Column extends React.Component {
  render() {
    const columnClass = classNames(styles["colLg"+this.props.lg],
    styles["colMd"+this.props.md], styles["colSm"+this.props.sm],
    styles["colXs"+this.props.xs]);
    return (
      <div className={columnClass}>
        {this.props.children}
      </div>
    )
  }
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
