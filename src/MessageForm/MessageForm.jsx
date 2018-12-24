import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../firebase';
import {connect} from 'react-redux'
import FileModal from '../FileModal/FileModal';


class MessageForm extends Component {

  state = {
    message: '',
    loading: false,
    errors: [],
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  createMessage = () => {
    const message = {
      content: this.state.message,
      time: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL
      }
    }
    return message;
    // console.log(message);
  }

  sendMessage = () => {
    const {messagesRef, currentChannel} = this.props;
    const {message} = this.state;

    if(message) {
      this.setState ({
        loading: true
      })
      messagesRef
      .child(currentChannel.id)
      .push()
      .set(this.createMessage())
      .then(()=> {
        this.setState({loading: false, message: ''})
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: this.state.errors.concat(err)
        })
      })
    }
  }
  render() {
    return (
      <Segment className='massega_form'>
        <Input
          fluid
          name='message'
          style={{ marginBottom: '0.7rem'}}
          label={<Button icon='add'/>}
          labelPosition='left'
          placeholder='Write your message'
          onChange={this.handlerChange}
          value={this.state.message}/>
        <Button.Group icon widths='2'>
          <Button color='orange' content='Add Reply' labelPosition='left' icon='edit' onClick={this.sendMessage}/>
          <Button color='teal' content='Upload media' labelPosition='right' icon='cloud upload' onClick={this.props.showModal}/>
          <FileModal modal={this.props.modal} closeModal={this.props.closeModal}/>
        </Button.Group>
      </Segment>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel,
  }
}
export default connect(mapStateToProps, null)(MessageForm);