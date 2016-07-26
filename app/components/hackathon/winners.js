// @flow
import React from 'react';

// material-ui
import { List, ListItem, Subheader, Divider } from 'material-ui';

// components
import { Row, Column } from '../grid/grid';

// types
import type { Hackathon } from '../../reducers/types';

type State = {
  hackathon: Hackathon
}

type Props = {
  state: State
}

export const Winners = (props: Props) => {
  const hackathon = props.state.hackathon;
  console.log('winners', hackathon)
  // filter prizes by category id and display
  if (hackathon.submissions.length > 0) {
    const categories = hackathon.categories.map((category) => {
      // get winner
      const winner = hackathon.submissions.filter((s) => s.categoryId === category.id)
      .sort((a, b) => b.points - a.points)[0];
      const item = winner ? <ListItem key={winner.id} primaryText={winner.id} /> : null;
      return (
        <span key={category.id}>
          <List>
            <Subheader>{category.name}</Subheader>
            {item}
          </List>
          <Divider />
        </span>
      );
    });
    return (
      <Row>
        <Column md={3} />
        <Column md={6}>
          <h1>Winners</h1>
          {categories}
        </Column>
      </Row>
    );
  }
  return (
    <span></span>
  );
};
