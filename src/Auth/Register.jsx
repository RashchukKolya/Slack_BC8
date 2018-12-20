import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import md5 from 'md5';
import firebase from '../firebase';

class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users'),
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isFormEmpty = ({username, email, password, passwordConfirm}) => {
    return !username.length || !email.length || !password.length || !passwordConfirm;
  }

  isPasswordValid = ({password, passwordConfirm}) => {
    return password === passwordConfirm;
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
    } else if (!this.isPasswordValid(this.state)){
      error = {
        message: 'Password is invalid'
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

saveUser = createdUser => {
  return this.state.userRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL,
  })
}

  handlerSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid()){
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser => {
      console.log(createdUser);
      createdUser.user.updateProfile({
        displayName: this.state.username,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })
      .then(() => {
        this.saveUser(createdUser).then(() => console.log('user saved'))
      })
    })
    .catch(err => {
      console.error(err);
      this.setState({ errors: this.state.errors.concat(err), loading: false})
    })
  }
  }

  handlerInput = (errors, inputName) => {
    return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }
  render() {
    const {errors} =this.state;
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
              className={this.handlerInput(errors, 'username')}
              onChange={this.handlerChange}
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='text'/>
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
            <Form.Input fluid 
              className={this.handlerInput(errors, 'password')}
              onChange={this.handlerChange}
              name='passwordConfirm'
              icon='repeat'
              iconPosition='left'
              placeholder='Password Confirn'
              type='password'/>
            <Button color='orange' fluid size='large'>Submit</Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {errors.map(el => <p key={el.message}>{el.message}</p>)}
          </Message>
        )}
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