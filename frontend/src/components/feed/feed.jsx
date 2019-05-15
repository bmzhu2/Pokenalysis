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
        this.props.fetchLikes();
    }

    render() {
        return(
            <div className="content-container">
                <TeamFeed
                    currentUser={this.props.currentUser} 
                    teams={this.props.teams} 
                    users={this.props.users}
                    fetchTeamLikes={this.props.fetchTeamLikes}
                    likes={this.props.likes}
                    createLike={this.props.createLike}
                />
            </div>
        )
    }
}

export default Feed;