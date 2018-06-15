import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { FormDropdown } from './../../../components';

class TeamForm extends Component {
  static propTypes = {
    fetchTwitterAccounts: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired
  };

  createTwitterAccount = ({ twitterAccountData }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/twitter_accounts', twitterAccountData)
        .then(res => {
          resolve(res);
          this.props.fetchTwitterAccounts();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  editTwitterAccount = ({ id, twitterAccountData }) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/twitter_accounts/${id}`, twitterAccountData)
        .then(res => {
          resolve(res);
          this.props.fetchTwitterAccounts();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  handleSubmit = formValues => {
    const { handleClose, isEdit } = this.props;
    const action = isEdit ? this.editTwitterAccount : this.createTwitterAccount;

    return new Promise((resolve, reject) => {
      const obj = {
        twitterAccountData: formValues
      };

      if (isEdit) {
        obj.id = formValues._id;
      }

      action(obj)
        .then(() => {
          resolve();
          handleClose();
        })
        .catch(err => {
          reject(err);
        });
    }).catch(err => console.error(err));
  };

  render() {
    const { handleSubmit, reset, submitting, handleClose, teams } = this.props;
    const teamOptions = teams.map(t => ({ value: t._id, text: t.name }));
    const typeOptions = [
      { value: 'player', text: 'Player' },
      { value: 'team', text: 'Team' },
      { value: 'media', text: 'Media' }
    ];

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Field>
          <label>Screen Name</label>
          <Field name="screenName" component="input" type="text" placeholder="Screen Name" />
        </Form.Field>

        <Form.Field>
          <label>Account Type</label>
          <Field
            name="accountType"
            component={FormDropdown}
            placeholder="Account Type"
            options={typeOptions}
            searchable
          />
        </Form.Field>

        <Form.Field>
          <label>Team</label>
          <Field
            name="team"
            component={FormDropdown}
            placeholder="Team"
            options={teamOptions}
            searchable
          />
        </Form.Field>

        <Button negative disabled={submitting} onClick={handleClose}>
          Cancel
        </Button>

        <Button disabled={submitting} onClick={reset}>
          Reset
        </Button>

        <Button primary loading={submitting} disabled={submitting}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'TeamForm'
})(TeamForm);
