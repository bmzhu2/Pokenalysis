import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './splash.css';

import NavbarContainer from '../nav/navbar_container';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="content-container">
                <NavbarContainer />
                <div className="splash-page">
                    <div className="row">
                        <div className="splash-logo"></div>
                    </div>
                    <div className="row">
                        <h2>the social Pokemon team-builder</h2>                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;


