import React, { Component } from 'react';
import axios from 'axios';
import { Loader, Segment, Container, Table, Button } from 'semantic-ui-react';
import LeagueForm from './LeagueForm';

export default class Leagues extends Component {
  state = {
    leagues: [],
    leaguesFetched: false
  };

  componentDidMount() {
    this.fetchLeagues();
  }

  fetchLeagues = () => {
    axios
      .get('/api/leagues')
      .then(({ data }) => {
        console.log(data);
        this.setState({ leagues: data, leaguesFetched: true });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { leaguesFetched, leagues } = this.state;

    if (!leaguesFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <Segment basic>
        <Container>
          <LeagueForm />

          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Short Name</Table.HeaderCell>
                <Table.HeaderCell>Slug</Table.HeaderCell>
                <Table.HeaderCell>Website</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {leagues.map(l => {
                return (
                  <Table.Row key={l._id}>
                    <Table.Cell>{l.name}</Table.Cell>
                    <Table.Cell>{l.shortName}</Table.Cell>
                    <Table.Cell>{l.slug}</Table.Cell>
                    <Table.Cell>
                      <a href={l.website} target="_blank">
                        {l.website}
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <Button primary size="tiny">
                        Edit
                      </Button>
                      <Button negative size="tiny">
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    );
  }
}
