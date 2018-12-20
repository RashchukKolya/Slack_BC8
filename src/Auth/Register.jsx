import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import firebase from '../firebase'

class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createUser => {
      console.log(createUser);
    })
    .catch(err => {
      console.error(err);
    })
  }
  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{
        maxWidth: 450 
      }}>
        <Header as='h2' icon color='orange' textAlign='center'>
          <Icon name='comment alternate' color='orange'/>
          Register for Slack-BC8
        </Header>
        <Form size='large'
        onSubmit={this.handlerSubmit}>
          <Segment>
            <Form.Input fluid 
              onChange={this.handlerChange}
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='text'/>
            <Form.Input fluid 
              onChange={this.handlerChange}
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='Email'
              type='email'/>
            <Form.Input fluid 
              onChange={this.handlerChange}
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'/>
            <Form.Input fluid 
              onChange={this.handlerChange}
              name='passwordConfirm'
              icon='repeat'
              iconPosition='left'
              placeholder='Password Confirn'
              type='password'/>
            <Button color='orange' fluid size='large'>Submit</Button>
          </Segment>
        </Form>
        <Message>
          Already a user?
          <NavLink to='/login'>&nbsp;Login</NavLink>
        </Message>
      </Grid.Column>
      </Grid>
    );
  }
}

export default Register;