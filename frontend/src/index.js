import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root'

import configureStore from './store/store';

import jwt_decode from 'jwt-decode';

import { logout, signup, login } from './actions/session_actions'
import {setAuthToken} from './util/session_api_util'
import { createTeam} from './actions/team_actions'

document.addEventListener('DOMContentLoaded', ()=> {
  let store;

  if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodedUser}};

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if(decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/'
    }
  } else{
    store = configureStore();
  }

  //DELETE LATER
  window.getState = store.getState
  window.dispatch = store.dispatch
  window.createTeam = createTeam
  window.signup = signup
  window.login = login

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root)
})
