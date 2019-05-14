import React from 'react';
import { Link } from 'react-router-dom';

import './about.css';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="about-page">
                    <div className="row header">
                        <div className="row">
                            <h1>Pokenalysis</h1> 
                        </div>
                        <div className="row">
                            <h2>the social Pokemon team-builder</h2>                        
                        </div>
                    </div>
                    <div className="row first">
                        <p>Pokenalysis is a online team builder that leverages the PokéAPI and allows users to create, 
                            analyze, save, and share teams of Pokemon.</p>
                    </div>
                    <div className="row last">
                        <p>To get started, explore created teams, or sign up and begin creating your own teams. 
                            Teams are comprised of up to six pokemon. Make sure to keep an eye on your team's strengths, 
                            weaknesses, and stats. A balanced team is a happy team.
                        </p>
                    </div>

                    <div className="row">
                        <Link className="link-button" to={'/feed'}>Browse Teams</Link>
                        <Link className="link-button" to={'/team-builder'}>Create a Team</Link>
                    </div>
                    <div className="row">
                        <Link className="link-button" to={'/'}>Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;


