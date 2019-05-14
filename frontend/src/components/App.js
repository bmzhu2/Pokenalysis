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
import ProfileContainer from './profile/profile_container'

const App = () => (
  <div id="app">
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      <Route exact path="/team-builder" component={teamBuilderContainer}/>
      <AuthRoute exact path="/login" component={LoginContainer}/>
      <AuthRoute exact path="/register" component={RegisterContainer}/>
      <Route path = "/users/:userId" component={ProfileContainer} />
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;