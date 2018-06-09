import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import './../../stylesheets/login.css';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  handleInputChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    const { email, password, passwordConfirm } = this.state;
    console.log(email, password, passwordConfirm);
  };

  render() {
    const { email, password, passwordConfirm } = this.state;
    const disabled = !email.length || !password.length || !passwordConfirm.length;

    return (
      <Segment basic className="login-form">
        <Grid verticalAlign="middle" textAlign="center">
          <Grid.Column computer={5} tablet={10} mobile={16}>
            <Header as="h2" textAlign="center">
              Create an Account
            </Header>

            <Form onSubmit={this.submitHandler}>
              <Segment stacked padded>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.handleInputChange}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  autoComplete="nope"
                  onChange={this.handleInputChange}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  name="passwordConfirm"
                  autoComplete="nope"
                  onChange={this.handleInputChange}
                />

                <Button color="blue" fluid size="large" disabled={disabled}>
                  Signup
                </Button>
              </Segment>
            </Form>

            <Message>
              Already have an account? <NavLink to="login">Login</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
