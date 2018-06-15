import React, { Component } from 'react';
import axios from 'axios';
import { Loader, Segment, Container, Table, Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import TeamForm from './TeamForm';

class Teams extends Component {
  state = {
    teams: [],
    teamsFetched: false,
    initialValues: {},
    isEdit: false,
    showModal: false
  };

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = () => {
    axios
      .get('/api/teams')
      .then(({ data }) => {
        console.log(data);
        this.setState({ teams: data, teamsFetched: true });
      })
      .catch(err => console.error(err));
  };

  handleOpen = () => this.setState({ showModal: true });

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetForm();
  };

  editHandler = team => {
    this.setState({ showModal: true, isEdit: true, initialValues: team });
  };

  resetForm = () => {
    this.setState({ isEdit: false, initialValues: {} });
  };

  deleteHandler = id => {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this team!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) this.deleteTeam(id);
    });
  };

  deleteTeam = id => {
    axios
      .delete(`/api/teams/${id}`)
      .then(res => {
        Swal('Deleted!', 'Leauge has been deleted.', 'success');
        this.fetchTeams();
      })
      .catch(err => console.error(err));
  };

  render() {
    const { teamsFetched, teams, initialValues, isEdit, showModal } = this.state;
    const { leagues } = this.props;

    if (!teamsFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <Segment basic>
        <Container>
          <Modal
            trigger={
              <Button color="green" size="tiny" onClick={this.handleOpen}>
                Add Team
              </Button>
            }
            onClose={this.handleClose}
            size="tiny"
            closeIcon
            open={showModal}>
            <Modal.Header>{isEdit ? 'Edit' : 'Add'} Team</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <TeamForm
                  fetchTeams={this.fetchTeams}
                  initialValues={initialValues}
                  isEdit={isEdit}
                  handleClose={this.handleClose}
                  enableReinitialize
                  leagues={leagues}
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
              {teams.map(l => {
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

const mapStateToProps = state => ({
  leagues: state.leagues
});

export default connect(
  mapStateToProps,
  null
)(Teams);
