import React, { Component } from 'react';
import MessageHeader from '../MessageHeader/MessageHeader';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase';
import {connect} from 'react-redux'
import SingleMessage from '../SingleMessage/SingleMessage';
import FileModal from '../FileModal/FileModal';


class Messeges extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    loading: true,
    modal: false,
    countUser: '',
    serchTerm: '',
    serchMessage: []
  }

  componentDidMount() {
    setTimeout(()=>{
      const {currentChannel, currentUser} = this.props;
      if(currentChannel && currentUser) {
        this.addListeners(currentChannel.id)
      }
    }, 1000)
  }
  hendlerSearch = async (e) => {
    await this.setState({
      serchTerm: e.target.value
    })
    this.searchMessages()
  }

  searchMessages = () => {
    let serchResult = this.state.messages.filter(el => {
      if(el.content){
        return el.content.toLowerCase().includes(this.state.serchTerm.toLowerCase())
      }
    });
    this.setState({
      serchMessage: serchResult
    })
  }
  countUnicUser = messages => {
    const iniqueUsers = messages.reduce((acc, el) => {
      if(!acc.includes(el.user.name)){
        acc.push(el.user.name)
      }
      return acc
    }, [])
    this.setState({
      countUser: `${iniqueUsers.length} users`
    })
  }
  closeModal = () => {
    this.setState({
      modal: false
    })
  }
  showModal = () => {
    this.setState({
      modal: true
    })
  }

  addListeners = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        loading: false
      })
      this.countUnicUser(loadedMessages)
    })
  }
  render() {
    const {messagesRef, messages, modal, countUser, serchTerm, serchMessage} = this.state;
    return (
      <React.Fragment>
        <MessageHeader countUser={countUser} hendlerSearch={this.hendlerSearch} serchTerm={serchTerm}/>
        <Segment>
          <Comment.Group
          className='message_m'>
            {serchMessage.length > 0 

              ? serchMessage.map(message => <SingleMessage key={message.time} message={message} user={message.user}/>) 
              
              :messages.length > 0 && messages.map(message => <SingleMessage key={message.time} message={message} user={message.user}/>)}
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef} showModal={this.showModal} modal={modal} closeModal={this.closeModal}/>
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