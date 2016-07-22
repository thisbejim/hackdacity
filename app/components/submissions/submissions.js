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
import { changeTab, upvote, cancelVote } from "../../actions/actions";

export const Submissions = (props) => {
  const uid = props.state.user.uid;
  const tab = props.state.hackathon.tab;

  const categories = props.state.hackathon.categories.map((category, index) => {
    const submissions = props.state.hackathon.submissions.filter((s) => {
      return s.categories.hasOwnProperty(category.id)
    }).map((submission, index) => {
      const voteButton = submission.votes.hasOwnProperty(uid)
        ? <CancelVote dispatch={props.dispatch} submission={submission} uid={uid} />
      : <UpVote dispatch={props.dispatch} submission={submission} uid={uid} />
      return (
        <Column key={index} md={4} sm={6}>
          <Card style={style.card}>
            <CardHeader title={"test"} />
            <CardMedia mediaStyle={style.cardMedia} >
              <img src={'http://placehold.it/350x350'} />
            </CardMedia>
            <CardActions>
              {voteButton}
            </CardActions>
          </Card>
        </Column>
      )
    });
    return (
      <Tab key={category.id} label={category.name} value={category.id}>
        <Row>
          {submissions}
        </Row>
      </Tab>
    )
  });
  return (
    <span>
      <h1>Submissions</h1>
      <Tabs
        value={tab}
        onChange={(value) => props.dispatch(changeTab(value))}
        tabItemContainerStyle={style.tabContainer}
      >
        {categories}
      </Tabs>
    </span>
  )
}

const CancelVote = (props) => {
  const s = props.submission;
  return (
    <FlatButton
      onTouchTap={() => props.dispatch(cancelVote(s.id, props.uid))}
      label={s.points}
      labelStyle={{color: "white"}}
      backgroundColor="green"
    />
  )
}

const UpVote = (props) => {
  const s = props.submission;
  return (
    <FlatButton
      onTouchTap={() => props.dispatch(upvote(s.id, props.uid))}
      label={s.points}
      labelStyle={{color: "white"}}
      backgroundColor="red"
    />
  )
}


const style = {
  card: {
    marginTop: 15,
    boxShadow: "rgba(0, 0, 0, 0.117647) 0 0 0, rgba(0, 0, 0, 0.117647) 0 0 0",
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderStyle: "solid"
  },
  cardMedia: {
    height: 200,
    overflow: "hidden"
  },
  tabContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  }
}
