import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './splash.css';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="splash-page">
                    <div className="row">
                        <div className="splash-logo"></div>
                    </div>
                    <div className="row">
                        <h2>the social Pokemon team-builder</h2>                    
                    </div>
                    <div className="row">
                        <Link className="link-button" to={'/feed'}>Browse Teams</Link>
                        <Link className="link-button" to={'/team-builder'}>Create a Team</Link>
                    </div>
                    <div className="row">
                        <Link className="link-button" to={'/about'}>About Pokenalysis</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;


