import React from 'react';
import { Link } from 'react-router-dom'

import './form.css'


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    update(field) {
        return e => this.setState({ 
            [field]: e.currentTarget.value 
        });
    }

    handleSubmit(e){
        e.preventDefault();
        var login = this.props.login; // ensure name in dispatch to props
        login = this.props.login.bind(this);
        const user = Object.assign({}, this.state);
        login(user)
            .then(data => {
                if(data === undefined){
                    this.props.closeModal();
                } else {
                    console.log("error logging in");
                }
            });      
    }

    renderErrors() {
        return(
            <div className="errors">
                {Object.values(this.props.errors).map( error => {
                    return( <p> {error} </p>)
                })}
            </div>
        )
    }

    demoLogin() {
        const user = {username: "Zinnia", password: "GetSalaMinced"}
        var login = this.props.login;
        login = this.props.login.bind(this);
        login(user)
            .then(data => {
                if (data === undefined) {
                    this.props.closeModal();
                } else {
                    console.log("error logging in");
                }
            });  
    }


    render(){

        return (
          <div className="content-container">
            <div className="form">
              <div className="splash-logo" />
              <h1>Login to Pokenalysis</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <label htmlFor="username-login">Username</label>
                  <input
                    id="username-login"
                    type="text"
                    onChange={this.update("username")}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="password-login">Password</label>
                  <input
                    id="password-login"
                    type="password"
                    onChange={this.update("password")}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="submit"
                    className="submit"
                    value="Login"
                  />
                </div>
                {this.renderErrors()}
              </form>
              <div className="form-row">
                <button onClick={this.demoLogin}>
                  <p>Demo User</p>
                </button>
              </div>
              <div className="form-row">
                <a onClick={() => this.props.openModal("register")}>
                  Need to create an account?
                </a>
              </div>
            </div>
          </div>
        );
    }

}

export default Login;