import React from 'react';

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
        const register = this.props.register; // ensure name in dispatch to props
        const user = Object.assign({}, this.state);
        register(user);
    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username-register">Username</label>
                    <input id="username-register" type="text" onChange={this.update("username")} />
                    <label htmlFor="password-register">Password</label>
                    <input id="password-register" type="password" onChange={this.update("password")} />
                    <label htmlFor="password2-register">Confirm Password</label>
                    <input id="password2-register" type="password" onChange={this.update("password")} />
                    <input type="submit" className="submit" value="Login" />
                </form>  
            </div>
        )
    }

}

export default Register;