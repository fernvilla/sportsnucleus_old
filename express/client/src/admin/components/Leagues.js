import React, { Component } from 'react';
import axios from 'axios';
import { Loader, Segment, Container, Table } from 'semantic-ui-react';

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
        <Container fluid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                {Object.keys(leagues[0]).map(l => {
                  return <Table.HeaderCell>{l}</Table.HeaderCell>;
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    );
  }
}
