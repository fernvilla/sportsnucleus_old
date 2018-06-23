import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Container, Table, Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import TeamForm from './TeamForm';
import { Loader } from './../../../components';

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
    const initialValues = Object.assign({}, team);
    initialValues.league = team.league._id;

    this.setState({ showModal: true, isEdit: true, initialValues });
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
        Swal('Deleted!', 'League has been deleted.', 'success');
        this.fetchTeams();
      })
      .catch(err => console.error(err));
  };

  render() {
    const { teamsFetched, teams, initialValues, isEdit, showModal } = this.state;
    const { leagues } = this.props;

    if (!teamsFetched) {
      return <Loader />;
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
                <Table.HeaderCell>League</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {teams.map(t => {
                return (
                  <Table.Row key={t._id}>
                    <Table.Cell>{t.name}</Table.Cell>
                    <Table.Cell>{t.shortName}</Table.Cell>
                    <Table.Cell>{t.slug}</Table.Cell>
                    <Table.Cell>
                      <a href={t.website} target="_blank">
                        {t.website}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{t.league.shortName}</Table.Cell>
                    <Table.Cell>
                      <Button primary size="tiny" onClick={() => this.editHandler(t)}>
                        Edit
                      </Button>

                      <Button negative size="tiny" onClick={() => this.deleteHandler(t._id)}>
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
