import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import Messeges from './Messeges/Messeges';
import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Grid columns='equal' className='app'>
      <ColorPanel/>
      <SidePanel/>
      <Grid.Column textAlign='center'>
        <Messeges/>
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel/>
      </Grid.Column>
      </Grid>
    );
  }
}

export default App;
