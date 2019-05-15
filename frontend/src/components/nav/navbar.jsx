import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import './nav.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navbar">
                    <Link to={'/'}><div className="icon"></div></Link>
                    <div className="links">
                        <p>Hi {this.props.currentUser.username}</p>
                        <Link to={'/users/' + this.props.currentUser.username}>Profile</Link>
                        <Link to={'/team-builder'}>Create a Team</Link>
                        <button onClick={this.logoutUser}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="navbar">
                    <Link to={'/'}> <div className="icon"></div> </Link> 
                    <div className="links">
                        <button onClick={() => this.props.openModal("register")}>Signup</button>
                        <button onClick={() => this.props.openModal("login")}>Login</button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
            {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);