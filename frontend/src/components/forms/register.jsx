import React from 'react';
import { Link } from 'react-router-dom'

import './form.css'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const register = this.props.register;
    const user = Object.assign({}, this.state);
    register(user).then(data => {
      if (data === undefined) {
        this.closeModal();
      } else {
        console.log("error logging in");
      }
    });
  }

  renderErrors() {
    return (
      <div className="errors">
        {Object.values(this.props.errors).map(error => {
          return <p> {error} </p>;
        })}
      </div>
    );
  }

  demoLogin() {
    const user = { username: "Zinnia", password: "GetSalaMinced" };
    var login = this.props.login;
    login = this.props.login.bind(this);
    login(user).then(data => {
      if (data === undefined) {
        this.props.closeModal();
      } else {
        console.log("error logging in");
      }
    });
  }

  render() {
    return (
      <div className="content-container">
        <div className="form">
          <div className="splash-logo" />
          <h1>Signup for Pokenalysis</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <label htmlFor="username-register">Username</label>
              <input
                id="username-register"
                type="text"
                onChange={this.update("username")}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password2-register">Password</label>
              <input
                id="password-register"
                type="password"
                onChange={this.update("password")}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password-register">Confirm Password</label>
              <input
                id="password2-register"
                type="password"
                onChange={this.update("password2")}
              />
            </div>
            <div className="form-row">
              <input type="submit" className="submit" value="Register" />
            </div>
            {this.renderErrors()}
          </form>
          <div className="form-row">
            <button onClick={this.demoLogin}>
              <p>Demo User</p>
            </button>
          </div>
          <div className="form-row">
            <a onClick={() => this.props.openModal("login")}>
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;