import React, { Component } from 'react';
import axios from 'axios';
import { Loader, Segment, Container, Table, Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import moment from 'moment';

export default class Users extends Component {
  state = {
    users: [],
    usersFetched: false,
    initialValues: {},
    isEdit: false,
    showModal: false
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios
      .get('/api/users')
      .then(({ data }) => {
        this.setState({ users: data, usersFetched: true });
      })
      .catch(err => console.error(err));
  };

  handleOpen = () => this.setState({ showModal: true });

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetForm();
  };

  editHandler = user => {
    this.setState({ showModal: true, isEdit: true, initialValues: user });
  };

  resetForm = () => {
    this.setState({ isEdit: false, initialValues: {} });
  };

  deleteHandler = id => {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
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
      .delete(`/api/users/${id}`)
      .then(res => {
        Swal('Deleted!', 'User has been deleted.', 'success');
        this.fetchUsers();
      })
      .catch(err => console.error(err));
  };

  render() {
    const { usersFetched, users, initialValues, isEdit, showModal } = this.state;

    if (!usersFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <Segment basic>
        <Container>
          {/*<Modal
            trigger={
              <Button color="green" size="tiny" onClick={this.handleOpen}>
                Add League
              </Button>
            }
            onClose={this.handleClose}
            size="tiny"
            closeIcon
            open={showModal}>
            <Modal.Header>{isEdit ? 'Edit' : 'Add'} League</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <LeagueForm
                  fetchUsers={this.fetchUsers}
                  initialValues={initialValues}
                  isEdit={isEdit}
                  handleClose={this.handleClose}
                  enableReinitialize
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
          */}

          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Admin</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map(u => {
                return (
                  <Table.Row key={u._id}>
                    <Table.Cell>{u.email}</Table.Cell>
                    <Table.Cell>{JSON.stringify(u.isAdmin)}</Table.Cell>
                    <Table.Cell>{moment.utc(u.date).format('M/D/YY M:hh A')}</Table.Cell>
                    <Table.Cell>
                      {/*<Button primary size="tiny" onClick={() => this.editHandler(u)}>
                        Edit
                </Button>*/}

                      {!u.isAdmin && (
                        <Button negative size="tiny" onClick={() => this.deleteHandler(u._id)}>
                          Delete
                        </Button>
                      )}
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
