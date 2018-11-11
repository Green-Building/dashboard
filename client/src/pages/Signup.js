import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Grid, Button, Form, Input, Segment, Header, Image, Message } from 'semantic-ui-react';
import client from '../client';
import qs from 'qs';

import Auth from '../modules/Auth';

import {
  INFRA_MANAGER_HOST
} from '../api-config';

class Signup extends Component {
  state = {
    email:'',
    password: '',
    name: '',
    user_type:'',
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this.state >>", this.state);
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      user_type: this.state.user_type,
    }

    return client({
      method: 'post',
      url: `${INFRA_MANAGER_HOST}/auth/signup`,
      data: qs.stringify(requestBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      console.log("response is>>>", response);
      Auth.authenticateUser(response.data.token);
      this.props.router.replace('/');
    })
  }

  render() {
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign up with an account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  label='Email'
                  name='email'
                  value={this.state.email}
                  placeholder='Email'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='address card'
                  iconPosition='left'
                  name='name'
                  placeholder='Name'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='user'
                  name='user_type'
                  iconPosition='left'
                  placeholder='User Type'
                  type='user_type'
                  onChange={this.handleChange}
                />
                <Button type="submit" color='teal' fluid size='large'>
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              Already Have an Account?  <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Signup;
