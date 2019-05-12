import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="content-container">
                <header>
                    <Link to="/" className="header-link">
                        <div className="icon-white"></div>
                    </Link>
                </header>
                <div className="splash-page">
                    <h1>Hi this is splash page</h1>
                </div>
            </div>
        );
    }
}

export default Splash;


