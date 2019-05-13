import React from 'react';
import { Link } from 'react-router-dom'

import './form.css'
import NavbarContainer from '../nav/navbar_container';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ 
            [field]: e.currentTarget.value 
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const login = this.props.login; // ensure name in dispatch to props
        const user = Object.assign({}, this.state);
        login(user)
            .then(() => this.props.history.push('/'));
    }


    render(){

        return(
            <div className="content-container">
                <NavbarContainer />
                <div className="form">
                    <h1>Login to Pokenalysis</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="username-login">Username</label>
                            <input id="username-login" type="text" onChange={this.update("username")} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password-login">Password</label>
                            <input id="password-login" type="password" onChange={this.update("password")} />
                        </div>
                        <div className="form-row">
                            <input type="submit" className="submit" value="Login" />                    
                        </div>
                        <div className="form-row">
                            <Link to={'/register'}>Need to create an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login;