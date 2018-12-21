import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../redux/action/setUserAction.js';
import firebase from '../firebase';
import App from '../App';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Spiner from '../Spiner/Spiner.jsx';

class Root extends Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      }
    })
  }
  render() {
    return this.props.isLoading ? <Spiner/> :(

        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Register}/>
        </Switch>
    );
  }
}
function MSTP(state) {
  return {
    isLoading: state.user.isLoading,
  }
}
function MDTP(dispatch){
  return {
    setUser: function(user){
      dispatch(setUser(user))
    }
  }
} 
export default  withRouter(connect(MSTP,MDTP)(Root));