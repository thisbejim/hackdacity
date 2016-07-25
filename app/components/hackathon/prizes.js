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

export const Prizes = (props: Props) => {
  const hackathon = props.state.hackathon;
  // filter prizes by category id and display
  const categories = hackathon.categories.map((category) => {
    const prizes = hackathon.prizes.filter((prize) => prize.categoryId === category.id)
    .map((prize) => <ListItem key={prize.id} primaryText={prize.text} />);
    return (
      <span key={category.id}>
        <List>
          <Subheader>{category.name}</Subheader>
          {prizes}
        </List>
        <Divider />
      </span>
    );
  });
  return (
    <Row>
      <Column md={3} />
      <Column md={6}>
        <h1>Prizes</h1>
        {categories}
      </Column>
    </Row>
  );
};
