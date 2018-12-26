import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import Messeges from './Messeges/Messeges';
import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import {connect} from 'react-redux'
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Grid columns='equal' className='app' style={{background: this.props.secondary}}>
      <ColorPanel/>
      <SidePanel/>
      <Grid.Column style={{marginLeft: 320}}>
        <Messeges/>
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel/>
      </Grid.Column>
      </Grid>
    );
  }
}
function mapStateToProps(state){
  return {
    secondary: state.color.secondary
  }
}
export default connect(mapStateToProps)(App);
