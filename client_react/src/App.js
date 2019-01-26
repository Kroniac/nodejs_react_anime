import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Scenes } from './config/import_paths'
import axios from 'axios';
import './App.css';

const Feeds = Scenes.Feeds();
const SinglePost = Scenes.SinglePost();
const Home = Scenes.Home();
const AnimeCharacters = Scenes.AnimeCharacters();

class App extends Component {
  _renderRoutes = () => {
    return (
      <Switch>
        <Route exact path = '/home' component = {Home} />
        <Route exact path = '/anime_characters' component = {AnimeCharacters} />
        <Route exact path = '/feeds' component = {Feeds} />
        <Route path = '/feeds/:postId/' component = {SinglePost} />
        <Redirect to = '/home' />
      </Switch>
    )
  }
  render() {
    return (
      <div className = 'App' >
        {this._renderRoutes()}
      </div>
    );
  }
}

export default App;
