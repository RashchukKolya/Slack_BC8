import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';

class Channels extends Component {

  state = {
    channels: [],
    name: '',
    descript: '',
    modal: false,
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

  addChanel = () => {
    this.setState(prev => ({
      channels: [...prev.channels, {channel: this.state.name, chanel: this.state.descript}],
      modal: false,
    }))
        
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
          <Form.Input fluid name='name' placeholder='Enter name of chanel' type='text' onChange={this.handlerChange}/>
          <Form.Input fluid name='descript' placeholder='Enter description' type='text' onChange={this.handlerChange}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={this.closeModal}>
            Cancel
          </Button>
          <Button  color='green' inverted onClick={this.addChanel}>
            Add
          </Button>
        </Modal.Actions>
      </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;