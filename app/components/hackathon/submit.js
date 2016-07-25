// @flow
import React from 'react';

// components
import { Row, Column } from '../grid/grid';

export class Submit extends React.Component {
  render() {
    return (
      <Row>
        <Column md={3} />
        <Column md={6}>
          <p>submit</p>
        </Column>
      </Row>
    );
  }
}
