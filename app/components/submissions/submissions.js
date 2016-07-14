import React from 'react';

// material-ui
import {
  Tabs, Tab, Card,
  CardTitle, CardActions, CardMedia,
  CardHeader, FlatButton, LinearProgress
} from 'material-ui';

// components
import { Row, Column } from '../grid/grid';

// actions
import { changeTab } from "../../actions/actions";

export const Submissions = (props) => {
    console.log(props)
    const tab = props.state.submissions.tab;

    const tiles = [
  {
    img: 'http://placehold.it/358x900',
    title: 'Breakfast',
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Tasty burger',
  },
  {
    img: 'http://placehold.it/1000x1000',
    title: 'Camera'
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Morning'
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Hats'
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Honey'
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Vegetables'
  },
  {
    img: 'http://placehold.it/350x350',
    title: 'Water plant'
  },
];

    const show = tiles.map((tile, index) => {

      return (
        <Column md={4} sm={6}>
          <Card style={{marginTop: 15, boxShadow: "rgba(0, 0, 0, 0.117647) 0px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 0px",
          borderWidth: 1, borderColor: "#D8D8D8", borderStyle: "solid"}}>
          <CardHeader
      title={tile.title}

    />
  <CardMedia mediaStyle={{height: 200, overflow: "hidden"}} >
            <img src={tile.img} />
          </CardMedia>
            <CardActions>
              <FlatButton label={"+13"} labelStyle={{color: "white"}} backgroundColor="red"/>
            </CardActions>
          </Card>
        </Column>
      )
    })
    return (
      <span>
      <h1>Submissions</h1>
      <Tabs
        value={tab}
        onChange={(value) => props.dispatch(changeTab(value))}
        tabItemContainerStyle={{borderTopLeftRadius: 3, borderTopRightRadius: 3}}
      >
        <Tab label="Crowd Favourite" value="a">
          <Row>
            {show}
          </Row>
        </Tab>
        <Tab label="Best Web App" value="b">
          <div>
            Currently there are no submissions...
          </div>
        </Tab>
        <Tab label="Best Android App" value="c">
        <div>
          <h2>Tab Three</h2>
          <p>
            This is a third example tab.
          </p>
        </div>
        </Tab>
        <Tab label="Best iOS App" value="d">
        <div>
          <h2>Tab Three</h2>
          <p>
            This is a third example tab.
          </p>
        </div>
        </Tab>
        <Tab label="Best Design" value="e">
        <div>
          <h2>Tab Three</h2>
          <p>
            This is a third example tab.
          </p>
        </div>
        </Tab>
      </Tabs>
    </span>
    )
}
