import React, { Component } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react';
import axios from 'axios';

export default class LeagueForm extends Component {
  state = {
    name: '',
    slug: '',
    website: '',
    shortName: ''
  };

  onChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, slug, website, shortName } = this.state;
    const leagueData = { name, slug, website, shortName };

    console.log(leagueData);

    axios
      .post('/api/leagues', leagueData)
      .then(res => {
        console.log(res);

        // this.setState({ tweets: data.payload, tweetsFetched: true });
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Modal
        size="tiny"
        trigger={
          <Button color="green" size="tiny">
            Add League
          </Button>
        }>
        <Modal.Header>Add League</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <Input name="name" placeholder="Name" onChange={this.onChange} />
              </Form.Field>

              <Form.Field>
                <label>Short Name</label>
                <Input name="shortName" placeholder="Short Name" onChange={this.onChange} />
              </Form.Field>

              <Form.Field>
                <label>Slug</label>
                <Input name="slug" placeholder="Slug" onChange={this.onChange} />
              </Form.Field>

              <Form.Field>
                <label>Website</label>
                <Input name="website" placeholder="Website" onChange={this.onChange} />
              </Form.Field>

              <Button primary type="button" onClick={this.onSubmit}>
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
