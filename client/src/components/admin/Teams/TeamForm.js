import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { fetchTeams } from './../../../actions/teamsActions';
import { FormDropdown } from './../../../components';

class TeamForm extends Component {
  static propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    leagues: PropTypes.array.isRequired
  };

  createTeam = ({ teamData }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/teams', teamData)
        .then(res => {
          resolve(res);
          this.props.fetchTeams();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  editTeam = ({ id, teamData }) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/teams/${id}`, teamData)
        .then(res => {
          resolve(res);
          this.props.fetchTeams();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  handleSubmit = formValues => {
    const { handleClose, isEdit, dispatch } = this.props;
    const action = isEdit ? this.editTeam : this.createTeam;

    return new Promise((resolve, reject) => {
      const obj = {
        teamData: formValues
      };

      if (isEdit) {
        obj.id = formValues._id;
      }

      action(obj)
        .then(() => {
          resolve();
          handleClose();
          dispatch(fetchTeams());
        })
        .catch(err => reject(err));
    }).catch(err => console.error(err));
  };

  render() {
    const { handleSubmit, reset, submitting, handleClose, leagues } = this.props;
    const leagueOptions = leagues.map(l => ({ value: l._id, text: l.name }));

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Field>
          <label>Name</label>
          <Field name="name" component="input" type="text" placeholder="Name" />
        </Form.Field>

        <Form.Field>
          <label>Short Name</label>
          <Field name="shortName" component="input" type="text" placeholder="Short Name" />
        </Form.Field>

        <Form.Field>
          <label>Slug</label>
          <Field name="slug" component="input" type="text" placeholder="Slug" />
        </Form.Field>

        <Form.Field>
          <label>Website</label>
          <Field name="website" component="input" type="text" placeholder="Website" />
        </Form.Field>

        <Form.Field>
          <label>League</label>
          <Field
            name="league"
            component={FormDropdown}
            placeholder="League"
            options={leagueOptions}
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
