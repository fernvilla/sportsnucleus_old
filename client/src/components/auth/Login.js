import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import './../../stylesheets/login.css';

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    const { email, password } = this.state;
    console.log(email, password);
  };

  render() {
    const { email, password } = this.state;
    const disabled = !email.length || !password.length;

    return (
      <Segment basic className="login-form">
        <Grid verticalAlign="middle" textAlign="center">
          <Grid.Column computer={5} tablet={10} mobile={16}>
            <Header as="h2" textAlign="center">
              Log in to Your Account
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
                  onChange={this.handleInputChange}
                />

                <Button color="blue" fluid size="large" disabled={disabled}>
                  Log in
                </Button>
              </Segment>
            </Form>

            <Message>
              New to us? <NavLink to="signup">Sign Up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
