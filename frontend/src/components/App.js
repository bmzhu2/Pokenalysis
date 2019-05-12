import React from 'react';
import { Auth, Protected } from '../util/route_util'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import SplashContainer from './splash/splash_container';
const App = () => (
  <div id="app">
    <Switch>
      <Route path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;