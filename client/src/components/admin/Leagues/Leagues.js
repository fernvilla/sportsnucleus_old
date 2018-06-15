import React, { Component } from 'react';
import axios from 'axios';
import { Loader, Segment, Container, Table, Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import LeagueForm from './LeagueForm';

export default class Leagues extends Component {
  state = {
    leagues: [],
    leaguesFetched: false,
    initialValues: {},
    isEdit: false,
    showModal: false
  };

  componentDidMount() {
    this.fetchLeagues();
  }

  fetchLeagues = () => {
    axios
      .get('/api/leagues')
      .then(({ data }) => {
        this.setState({ leagues: data, leaguesFetched: true });
      })
      .catch(err => console.error(err));
  };

  handleOpen = () => this.setState({ showModal: true });

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetForm();
  };

  editHandler = league => {
    this.setState({ showModal: true, isEdit: true, initialValues: league });
  };

  resetForm = () => {
    this.setState({ isEdit: false, initialValues: {} });
  };

  deleteHandler = id => {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this league!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) this.deleteLeague(id);
    });
  };

  deleteLeague = id => {
    axios
      .delete(`/api/leagues/${id}`)
      .then(res => {
        Swal('Deleted!', 'Leauge has been deleted.', 'success');
        this.fetchLeagues();
      })
      .catch(err => console.error(err));
  };

  render() {
    const { leaguesFetched, leagues, initialValues, isEdit, showModal } = this.state;

    if (!leaguesFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <Segment basic>
        <Container>
          <Modal
            trigger={
              <Button color="green" size="tiny" onClick={this.handleOpen}>
                Add League
              </Button>
            }
            onClose={this.handleClose}
            size="tiny"
            closeIcon
            open={showModal}>
            <Modal.Header>Add League</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <LeagueForm
                  fetchLeagues={this.fetchLeagues}
                  initialValues={initialValues}
                  isEdit={isEdit}
                  handleClose={this.handleClose}
                  enableReinitialize
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>

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
                      <Button primary size="tiny" onClick={() => this.editHandler(l)}>
                        Edit
                      </Button>

                      <Button negative size="tiny" onClick={() => this.deleteHandler(l._id)}>
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
