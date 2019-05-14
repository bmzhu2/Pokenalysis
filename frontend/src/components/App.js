import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import {
    Route,
    Redirect,
    Switch,
    Link,
} from 'react-router-dom';

import teamBuilderContainer from './team_builder/team_builder_container';
import './reset.css';
import SplashContainer from './splash/splash_container';
import LoginContainer from './forms/login_container';
import RegisterContainer from './forms/register_container';
import NavBarContainer from './nav/navbar_container'
import FeedContainer from './feed/feed_container';

const App = () => (
  <div id="app">
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      <Route exact path="/team-builder" component={teamBuilderContainer}/>
      <Route exact path="/feed" component={FeedContainer} />

      <AuthRoute exact path="/login" component={LoginContainer}/>
      <AuthRoute exact path="/register" component={RegisterContainer}/>
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;