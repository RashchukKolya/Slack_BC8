import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../firebase';
import {connect} from 'react-redux';
import FileModal from '../FileModal/FileModal';
import uuidv4 from 'uuid/v4';


class MessageForm extends Component {

  state = {
    message: '',
    loading: false,
    errors: [],
    modal: false,
    uploadTask: null,
    storegeRef: firebase.storage().ref()
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  createMessage = (url = null) => {
    const message = {
      // content: this.state.message,
      time: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL
      }
    }
    if(url !== null){
      message['image'] = url
    } else {
      message['content'] = this.state.message;
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

  uploadFile = (file, metadata) => {
    // console.log(file, metadata);
    const pathToUpload = this.props.currentChannel.id;
    const ref = this.props.messagesRef;
    const filePath = `chat/public/image${uuidv4()}.jpg`;
    this.setState({
      uploadTask: this.state.storegeRef.child(filePath).put(file, metadata)
    },
    () => {
      this.state.uploadTask.on(
        'state_changed',
        () => {
          this.state.uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadUrl => {
            this.sendFileMessage(downloadUrl, ref, pathToUpload);
          })
          .catch(err => {
            console.log(err);
          });
        }
      )
    }
    )
  }

  sendFileMessage = (url, ref, path) => {
    ref.child(path)
    .push()
    .set(this.createMessage(url))
    .catch(err => {
      console.log(err);
    })

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
          <FileModal modal={this.props.modal} closeModal={this.props.closeModal} uploadFile={this.uploadFile}/>
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