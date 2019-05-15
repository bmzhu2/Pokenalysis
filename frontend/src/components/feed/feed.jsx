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
                    fetchTeamLikes={this.props.fetchTeamLikes}
                    createLike={this.props.createLike}
                    currentUser={this.props.currentUser}
                    openModal={this.props.openModal}
                />
            </div>
        )
    }
}

export default Feed;