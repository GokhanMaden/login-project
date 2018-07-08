import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Feed from './components/Feed'
import Profile from './components/Profile'
import ArticleView from './components/ArticleView'
import Editor from './components/Editor'
import requireAuthentication from './utils/requireAuth'
import SignInWith from './components/SignInWith'

class App extends Component {
  render() {
    const pathName = window.location.pathname
    return (
      <div>
        {!pathName.includes('editor') ? <Header /> : ''}
        <SignInWith />
        <Switch>
          <Route path="/" component={Feed} />
          <Route path="profile/:id" component={Profile} />
          <Route path="articleview/:id" component={ArticleView} />
          <Route path="/editor" component={requireAuthentication(Editor)} />
          <Route path="**" component={Feed} />
        </Switch>
      </div>
    );
  }
}

export default App;
