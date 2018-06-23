import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Container, Table, Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import TwitterAccountForm from './TwitterAccountForm';
import { Loader } from './../../../components';

class TwitterAccounts extends Component {
  state = {
    twitterAccounts: [],
    twitterAccountsFetched: false,
    initialValues: {},
    isEdit: false,
    showModal: false
  };

  componentDidMount() {
    this.fetchTwitterAccounts();
  }

  fetchTwitterAccounts = () => {
    axios
      .get('/api/twitter_accounts')
      .then(({ data }) => {
        this.setState({ twitterAccounts: data, twitterAccountsFetched: true });
      })
      .catch(err => console.error(err));
  };

  handleOpen = () => this.setState({ showModal: true });

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetForm();
  };

  editHandler = twitterAccount => {
    const initialValues = Object.assign({}, twitterAccount);
    initialValues.team = twitterAccount.team._id;

    this.setState({ showModal: true, isEdit: true, initialValues });
  };

  resetForm = () => {
    this.setState({ isEdit: false, initialValues: {} });
  };

  deleteHandler = id => {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this account!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) this.deleteTwitterAccount(id);
    });
  };

  deleteTwitterAccount = id => {
    axios
      .delete(`/api/twitter_accounts/${id}`)
      .then(res => {
        Swal('Deleted!', 'Leauge has been deleted.', 'success');
        this.fetchTwitterAccounts();
      })
      .catch(err => console.error(err));
  };

  render() {
    const {
      twitterAccountsFetched,
      twitterAccounts,
      initialValues,
      isEdit,
      showModal
    } = this.state;
    const { teams } = this.props;

    if (!twitterAccountsFetched) {
      return <Loader />;
    }

    return (
      <Segment basic>
        <Container>
          <Modal
            trigger={
              <Button color="green" size="tiny" onClick={this.handleOpen}>
                Add Twitter Account
              </Button>
            }
            onClose={this.handleClose}
            size="tiny"
            closeIcon
            open={showModal}>
            <Modal.Header>{isEdit ? 'Edit' : 'Add'} Twitter Account</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <TwitterAccountForm
                  fetchTwitterAccounts={this.fetchTwitterAccounts}
                  initialValues={initialValues}
                  isEdit={isEdit}
                  handleClose={this.handleClose}
                  enableReinitialize
                  teams={teams}
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Account Name</Table.HeaderCell>
                <Table.HeaderCell>Account Type</Table.HeaderCell>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {twitterAccounts.map(t => {
                return (
                  <Table.Row key={t._id}>
                    <Table.Cell>
                      <a href={`http://twitter.com/${t.screenName}`} target="_blank">
                        {t.screenName}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{t.accountType}</Table.Cell>
                    <Table.Cell>{t.team.shortName}</Table.Cell>
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
  teams: state.teams
});

export default connect(
  mapStateToProps,
  null
)(TwitterAccounts);
