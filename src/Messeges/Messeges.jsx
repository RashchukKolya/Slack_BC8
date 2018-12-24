import React, { Component } from 'react';
import MessageHeader from '../MessageHeader/MessageHeader';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase';


class Messeges extends Component {
  state = {
    messagesRef: firebase.database().ref('messages')
  }
  render() {
    const {messagesRef} = this.state;
    return (
      <React.Fragment>
        <MessageHeader/>
        <Segment>
          <Comment.Group
          className='message'>
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef}/>
      </React.Fragment>
    );
  }
}

export default Messeges;