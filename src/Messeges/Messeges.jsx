import React, { Component } from 'react';
import MessageHeader from '../MessageHeader/MessageHeader';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase';
import {connect} from 'react-redux'
import SingleMessage from '../SingleMessage/SingleMessage';


class Messeges extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    loading: true,
  }

  componentDidMount() {
    setTimeout(()=>{
      const {currentChannel, currentUser} = this.props;
      if(currentChannel && currentUser) {
        this.addListeners(currentChannel.id)
      }
    }, 1000)
  }
  addListeners = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        loading: false
      })
    })
  }
  render() {
    const {messagesRef, messages} = this.state;
    return (
      <React.Fragment>
        <MessageHeader/>
        <Segment>
          <Comment.Group
          className='message'>
            {messages.length > 0 && messages.map(message => <SingleMessage key={message.time} message={message} user={message.user}/>)}
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef}/>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state){
  return {
    currentChannel: state.channel,
    currentUser: state.user.currentUser,
  }
}
export default connect(mapStateToProps, null)(Messeges);