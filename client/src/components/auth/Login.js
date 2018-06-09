import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './../../stylesheets/login.css';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  onChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = { email, password };

    console.log(user);
  };

  render() {
    const { email, password } = this.state;
    const disabled = !email.length || !password.length;

    return (
      <Segment basic className="login-form">
        <Grid verticalAlign="middle" textAlign="center">
          <Grid.Column computer={5} tablet={10} mobile={16}>
            <Header as="h2" textAlign="center">
              Log Into Your Account
            </Header>

            <Form onSubmit={this.onSubmit}>
              <Segment stacked padded>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />

                <Button color="blue" fluid size="large" disabled={disabled}>
                  Login
                </Button>
              </Segment>
            </Form>

            <Message>
              New to us? <Link to="signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
