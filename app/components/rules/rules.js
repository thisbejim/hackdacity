import React from 'react';

// components
import { Row, Column } from '../grid/grid';

export class Rules extends React.Component {
  render() {
    return (
      <Row>
        <Column md={3}> </Column>
        <Column md={6}>
          <h1>Rules</h1>

          <h3>Theme</h3>

          <p>
            Teams must build an application for iOS, Android, or the web, based
            around the theme of "Creating connections for Udacity Alumni using Firebase".
            Connections could include: alumni to alumni, alumni as mentors to new students,
            alumni to workplaces, or any other beneficial connections teams can think up!
          </p>

          <h3>Rules</h3>
          <p>
            Teams comprised of one to four alumni have 72 hours to build applications
            that make use of the Firebase platform. Applications must be made specifically
            for the hackathon and cannot use pre-existing code or graphics assets;
            however, boilerplate code may be used if it is publicly available.
            Participants must host their code on Github and make regular commits
            throughout the event.
          </p>

          <h3>Dates</h3>
          <p>
            Hackdacity will run for 72 hours, from 12:00:00am UTC Friday, date to 12:00:00am UTC Monday, date.
          </p>

          <h3>Voting</h3>
          <p>
            Separate threads for each prize will be posted on this subreddit when
            the voting phase begins. The alumni community will vote for their favourite
            projects in each category.

            Teams must submit a project name, github link, and description for each
            prize category they wish to be considered for. It is also recommended
            that participants building a web application host a live version
            of their project using Firebase hosting.
          </p>


          <h3>During the event</h3>

          <p>
            The Hackdacity slack team is a great place to join a team, socialise,
            and get technical support from peers and mentors during the event.
          </p>

          <p>
            Keep us updated - We would love to see what you and your team are working on!
            Tweet updates and pictures to the <a href="https://twitter.com/hackdacity">@hackdacity twitter account</a>.
          </p>
        </Column>
      </Row>
    )
  }
}
