import React from 'react';
import { Auth, Protected } from '../util/route_util'
import {
    Route,
    Redirect,
    Switch,
    Link,
} from 'react-router-dom';
import teamBuilderContainer from './team_builder/team_builder_container';
import SplashContainer from './splash/splash_container';
import LoginContainer from './forms/login_container';
import RegisterContainer from './forms/register_container';
const App = () => (
  <div id="app">
    <Switch>
      <Route exact path="/team-builder" component={teamBuilderContainer}/>
      <Route exact path="/login" component={LoginContainer}/>
      <Route exact path="/register" component={RegisterContainer}/>
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;