import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/coomon/Preloader/Preloader';



class App extends Component {
  
  componentDidMount (){
    this.props.initializeApp();
  }
  render () {
    if(!this.props.initialized){
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
        
          <Switch>
            <Route exact path="/" render={ ()=><Redirect to="/profile" />} />
            <Route path="/profile/:userId?" component={ProfileContainer} />
            <Route path="/dialogs"  component={DialogsContainer} /> 
            <Route path="/users" component= {UsersContainer} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} /> 
            <Route path="/login" component={Login} />
            <Route path="*" render={ ()=><div>404 NOT FOUND</div> } />

          </Switch>
  
        </div>
      </div>  
      
    );
  } 
}

const mapStateToProps=(state)=>({
  initialized: state.app.initialized,
})

export default compose(
  withRouter, 
  connect(mapStateToProps, {initializeApp}))(App);




