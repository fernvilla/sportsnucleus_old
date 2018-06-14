import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Label, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/authActions';

import './../../stylesheets/login.css';

class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    errors: {}
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      history,
      auth: { isAuthenticated }
    } = this.props;

    if (isAuthenticated) {
      history.push('/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;

    if (errors !== this.props.errors) {
      this.setState({ errors });
    }
  }

  onChange = e => {
    const {
      target: { value, name }
    } = e;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password, passwordConfirm } = this.state;
    const { registerUser, history } = this.props;
    const newUser = { email, password, passwordConfirm };

    registerUser(newUser, history);
  };

  render() {
    const { email, password, passwordConfirm, errors } = this.state;
    const { registeringUser } = this.props;

    return (
      <Segment basic className="login-form">
        <Grid verticalAlign="middle" textAlign="center">
          <Grid.Column computer={5} tablet={10} mobile={16}>
            <Header as="h2" textAlign="center">
              Create an Account
            </Header>

            <Form onSubmit={this.onSubmit}>
              <Segment stacked padded>
                <Form.Field>
                  <Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Email address"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    error={errors.email && !!errors.email.length}
                  />

                  {errors.email &&
                    !!errors.email.length && (
                      <Label basic color="red" pointing>
                        {errors.email}
                      </Label>
                    )}
                </Form.Field>

                <Form.Field>
                  <Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="nope"
                    onChange={this.onChange}
                    value={password}
                    error={errors.password && !!errors.password.length}
                  />

                  {errors.password &&
                    !!errors.password.length && (
                      <Label basic color="red" pointing>
                        {errors.password}
                      </Label>
                    )}
                </Form.Field>

                <Form.Field>
                  <Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password"
                    name="passwordConfirm"
                    autoComplete="nope"
                    onChange={this.onChange}
                    value={passwordConfirm}
                    error={errors.passwordConfirm && !!errors.passwordConfirm.length}
                  />

                  {errors.passwordConfirm &&
                    !!errors.passwordConfirm.length && (
                      <Label basic color="red" pointing>
                        {errors.passwordConfirm}
                      </Label>
                    )}
                </Form.Field>

                <Button color="blue" fluid size="large" loading={registeringUser}>
                  Sign Up
                </Button>
              </Segment>
            </Form>

            <Message>
              Already have an account? <Link to="login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  registeringUser: state.registeringUser
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userData, history) => dispatch(registerUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
