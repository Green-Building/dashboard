import React, { Component } from 'react';
import { Container, Grid, Button, Form, Input } from 'semantic-ui-react';
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group >
                  <Form.Field>
                    <label>Email</label>
                    <Input name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Input name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Name</label>
                    <Input name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>User Type</label>
                    <Input name='user_type' value={this.state.user_type} placeholder='User Type' onChange={this.handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Signup;
