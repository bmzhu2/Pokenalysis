import React from 'react';
import { Link } from 'react-router-dom'

import './form.css'
import NavbarContainer from '../nav/navbar_container';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const register = this.props.register;
        const user = Object.assign({}, this.state);
        register(user)
            .then(() => this.props.history.push('/'));
    }


    render() {
        return (

            <div className="content-container">
                <NavbarContainer />
                <div className="form">
                    <h1>Signup for Pokenalysis</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="username-register">Username</label>
                            <input id="username-register" type="text" onChange={this.update("username")} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password2-register">Password</label>
                            <input id="password-register" type="password" onChange={this.update("password")} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password-register">Confirm Password</label>
                            <input id="password2-register" type="password" onChange={this.update("password2")} />
                        </div>
                        <div className="form-row">
                            <input type="submit" className="submit" value="Register" />
                        </div>
                        <div className="form-row">
                            <Link to={'/login'}>Already have an account?</Link>
                        </div>
                    </form>  
                </div>
            </div>
        )
    }

}

export default Register;