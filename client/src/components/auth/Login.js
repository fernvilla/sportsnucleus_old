import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Form, Segment, Button, Header, Message, Label, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { loginUser } from './../../actions/authActions';

import './../../stylesheets/login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      history,
      auth: { isAuthenticated }
    } = this.props;

    if (isAuthenticated) {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      errors,
      auth: { isAuthenticated }
    } = nextProps;

    if (isAuthenticated !== this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

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

    const { email, password } = this.state;
    const { loginUser } = this.props;
    const user = { email, password };

    loginUser(user);
  };

  render() {
    const { email, password, errors } = this.state;
    const { loggingIn } = this.props;

    return (
      <Segment basic className="login-form">
        <Grid verticalAlign="middle" textAlign="center">
          <Grid.Column computer={5} tablet={10} mobile={16}>
            <Header as="h2" textAlign="center">
              Log Into Your Account
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
                  />

                  {errors.email &&
                    !!errors.email.length && (
                      <Label color="red" pointing>
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
                    onChange={this.onChange}
                    value={password}
                  />

                  {errors.password &&
                    !!errors.password.length && (
                      <Label color="red" pointing>
                        {errors.password}
                      </Label>
                    )}
                </Form.Field>

                <Button color="blue" fluid size="large" loading={loggingIn}>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loggingIn: state.loggingInUser
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
