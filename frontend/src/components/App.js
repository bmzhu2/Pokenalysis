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
import ProfileContainer from './profile/profile_container';
import About from './about/about';
import TeamShowContainer from './show/team_show_container';
import SessionModal from './forms/modal';

const App = () => (
  <div id="app">
    <header>
      <NavBarContainer />
      <SessionModal />
    </header>
    <Switch>
      <Route exact path="/team-builder" component={teamBuilderContainer}/>
      <Route exact path="/feed" component={FeedContainer} />

      <Route path = "/users/:username" component={ProfileContainer} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={SplashContainer} />
      <Route path="/teams/:teamId" component={TeamShowContainer} />
    </Switch>
  </div>
);

export default App;