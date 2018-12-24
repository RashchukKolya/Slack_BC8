import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';
import firebase from '../firebase';
import {connect} from 'react-redux'

class Channels extends Component {

  state = {
    channels: [],
    name: '',
    descript: '',
    modal: false,
    channelsRef: firebase.database().ref('channels')
  }
  
  showModal = () => {
    this.setState({
      modal: true
    })
  }
  
  closeModal = () => {
    this.setState({
      modal: false
    })
  }
  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  addChannel = () => {
    const {channelsRef, descript, name} = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: name,
      details: descript,
      createdBy: {
        name: this.props.user.displayName,
        avatar: this.props.user.photoURL,
      }
    }
    
    channelsRef
    .child(key)
    .update(newChannel)
    .then(()=> {
      this.setState({
        name: '', descript: ''
      })
      this.closeModal();
      console.log('channel added');
    })
    .catch(err => console.log(err))
  }
  // addChanel = () => {
  //   this.setState(prev => ({
  //     channels: [...prev.channels, {channel: this.state.name, chanel: this.state.descript}],
  //     modal: false,
  //   }))   
  // }

  handlerSubmit = e => {
    e.preventDefault();
    if(!this.state.name=='' && !this.state.descript==''){
      this.addChannel()
    }
  }

  render() {
    const {channels, modal} = this.state;
    return (
      <React.Fragment>
      <Menu.Menu style={{paddingBottom: '2rem'}}>
        <Menu.Item>
          <span>
            <Icon name='exchange'/>CHANNELS
          </span>({channels.length})<Icon name='add' onClick={this.showModal}/>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modal}>
        <Modal.Header>
          Add channel
        </Modal.Header>
        <Modal.Content>
        <Form onSubmit={this.handlerSubmit}>
          <Form.Input fluid name='name' placeholder='Enter name of chanel' type='text' onChange={this.handlerChange}/>
          <Form.Input fluid name='descript' placeholder='Enter description' type='text' onChange={this.handlerChange}/>
        </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={this.closeModal}>
            Cancel
          </Button>
          <Button  color='green' inverted onClick={this.handlerSubmit}>
            Add
          </Button>
        </Modal.Actions>
      </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user.currentUser
  }
}
export default connect(mapStateToProps, null)(Channels);