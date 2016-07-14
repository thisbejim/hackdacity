import React from 'react';

// material-ui
import { List, ListItem, Subheader, Divider, Avatar } from 'material-ui';

// components
import { Row, Column } from '../grid/grid';

export const Prizes = (props) => {
    return (
      <Row>
        <Column md={3}> </Column>
        <Column md={6}>
          <h1>Prizes</h1>
          <List>
            <Subheader>Crowd Favourite</Subheader>
            <ListItem
              primaryText="Brendan Lim"
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            />
            <ListItem
              primaryText="Grace Ng"
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
            />
          </List>
          <Divider />
          <List>
            <Subheader>Best Web App</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
              />
          </List>
          <Divider />
          <List>
            <Subheader>Best Android App</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
              />
          </List>
          <Divider />
          <List>
            <Subheader>Best iOS App</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
              />
          </List>
          <Divider />
          <List>
            <Subheader>Best Design</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
              />
          </List>
        </Column>
      </Row>
    )
}
