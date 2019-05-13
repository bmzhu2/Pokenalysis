import React from 'react';

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
        login(user);
    }


    render(){

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username-login">Username</label>
                    <input id="username-login" type="text" onChange={this.update("username")} />
                    <label htmlFor="password-login">Password</label>
                    <input id="password-login" type="password" onChange={this.update("password")} />
                    <input type="submit" className="submit" value="Login" />
                </form>
            </div>
        )
    }

}

export default Login;