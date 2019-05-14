import React from 'react';
// import { Link } from 'react-router-dom'

import './feed.css'
import NavbarContainer from '../nav/navbar_container';
import TeamFeed from './team_feed';

class Feed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTeams();
    }

    render() {
        return(
            <div className="content-container">
                <TeamFeed 
                    teams={this.props.teams} 
                    users={this.props.users}
                    fetchUser={this.props.fetchUser} />
            </div>
        )
    }
}

export default Feed;