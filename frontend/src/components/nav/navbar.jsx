import React from 'react';
import { Link } from 'react-router-dom'
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
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navbar">
                    <div className="icon"></div>
                    <div className="links">
                        <p>Hi {this.props.currentUser.username}</p>
                        <Link to={'/profile'}>Profile</Link>
                        <Link to={'/new_team'}>Create a Team</Link>
                        <button onClick={this.logoutUser}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="navbar">
                    <Link to={'/'}> <div className="icon"></div> </Link> 
                    <div className="links">
                        <Link to={'/register'}>Signup</Link>
                        <Link to={'/login'}>Login</Link>
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

export default NavBar;