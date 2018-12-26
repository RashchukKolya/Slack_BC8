import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import firebase from '../firebase'
import {TwitterPicker} from 'react-color'
import {connect} from 'react-redux';

class ColorPanel extends Component {
  state = {
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref('users')
  };

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

  handleChangePrimaryColor = color => {
    this.setState({primary: color.hex})
  }
  handleChangeSecondaryColor = color => {
    this.setState({secondary: color.hex})
  }

  saveColors = (primary, secondary) => {
    this.state.usersRef
    .child(`${this.props.currentUser.uid}/color`)
    .push()
    .update({
      primary,
      secondary
    })
    .then(() => {
      console.log('Colors added');
      this.closeModal();
    })
    .catch(err => console.log(err))
  }

  handleSaveColor = () => {
  if(this.state.primary && this.state.secondary) {
    this.saveColors(this.state.primary, this.state.secondary);
  }
  };
  render() {
    const{modal, primary, secondary} = this.state
    return (
      <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      visible
      vertical
      width='very thin'>
      <Divider/>
      <Button icon='add' size='small' color='blue' onClick={this.openModal}/>
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content='Primary Color'/>
            <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>
          </Segment>
          <Segment>
            <Label content='Secondary Color'/>
            <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleSaveColor}>
            <Icon name='checkmark' /> Save Color
          </Button>
          <Button color='red' inverted onClick={this.closeModal}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      </Sidebar>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.user.currentUser,
  }
}
export default connect(mapStateToProps)(ColorPanel);