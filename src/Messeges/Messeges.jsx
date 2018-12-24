import React, { Component } from 'react';
import MessageHeader from '../MessageHeader/MessageHeader';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';


class Messeges extends Component {
  render() {
    return (
      <React.Fragment>
        <MessageHeader/>
        <Segment>
          <Comment.Group
          className='message'>
          </Comment.Group>
        </Segment>
        <MessageForm/>
      </React.Fragment>
    );
  }
}

export default Messeges;