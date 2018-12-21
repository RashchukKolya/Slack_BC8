import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import firebase from '../firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isFormEmpty = ({email, password}) => {
    return !email.length || !password.length;
  }

  isFormValid = () => {
    let errors = [];
    let error;
    if(this.isFormEmpty(this.state)){
      error = {
        message: 'Fill in all fields'
      };
      this.setState({
        errors: errors.concat(error)
      })
      return false;
    } else {
      this.setState({
        errors: []
      })
      return true
    }
  }

  handlerInput = (errors, inputName) => {
    return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid(this.state)){
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(signedInUser => {
      console.log(signedInUser);
    })
    .catch(err => {
      console.error(err);
      this.setState({ errors: this.state.errors.concat(err), loading: false})
    })
  }
  }


  render() {
    const {errors} = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{
        maxWidth: 450 
      }}>
        <Header as='h2' icon color='violet' textAlign='center'>
          <Icon name='code branch' color='violet'/>
          Login to Slack-BC8
        </Header>
        <Form size='large'
        onSubmit={this.handlerSubmit}>
          <Segment>
            <Form.Input fluid 
              className={this.handlerInput(errors, 'email')}
              onChange={this.handlerChange}
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='Email'
              type='email'/>
            <Form.Input fluid 
              className={this.handlerInput(errors, 'password')}
              onChange={this.handlerChange}
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'/>
            <Button color='violet' fluid size='large'>Submit</Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {errors.map(el => <p key={el.message}>{el.message}</p>)}
          </Message>
        )}
        <Message>
          Don't have an account?
          <NavLink to='/registration'>&nbsp;Registration</NavLink>
        </Message>
      </Grid.Column>
      </Grid>
    );
  }
}

export default Login;