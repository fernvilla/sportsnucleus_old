import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

class LeagueForm extends Component {
  static propTypes = {
    fetchLeagues: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  createLeague = leagueData => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/leagues', leagueData)
        .then(res => {
          resolve(res);
          this.props.fetchLeagues();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  editLeague = ({ id, leagueData }) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/leagues/${id}`, leagueData)
        .then(res => {
          resolve(res);
          this.props.fetchLeagues();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  handleSubmit = formValues => {
    const { handleClose, isEdit } = this.props;
    const action = isEdit ? this.editLeague : this.createLeague;

    return new Promise((resolve, reject) => {
      const obj = {
        leagueData: formValues
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
    const { handleSubmit, reset, submitting, handleClose } = this.props;

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
  form: 'LeagueForm'
})(LeagueForm);
