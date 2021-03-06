import React from 'react'
import TeamItem from '../feed/team_item'
import './profile.css';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            switch: 'myTeams'
        }
        this.handleSwitch = this.handleSwitch.bind(this)
    }

    componentDidMount(){
        this.props.fetchUserLikes(this.props.match.params.username);
        this.props.fetchTeams();
        this.props.fetchUser(this.props.match.params.username);
    }

    handleSwitch(){
        if(this.state.switch === 'myTeams'){
            this.setState({switch: 'likedTeams'})
        }else{
            this.setState({switch: 'myTeams'})
        }
    }

    render(){
        if(this.props.user){
            let myTeamsButton
            let likedTeamsButton
            let currentIndex
            if(this.state.switch === 'myTeams'){
                myTeamsButton = <div className='disabled-profile-button'>
                    {this.props.match.params.username}'s Teams
                </div>;
                likedTeamsButton = <div onClick={this.handleSwitch} className='active-profile-button'>
                    Liked Teams
                </div>;
                currentIndex = this.props.userTeams.map(team => (
                    <TeamItem
                        key={team._id}
                        team={team}
                        fetchTeamLikes={this.props.fetchTeamLikes}
                    />
                ))
            }else{
                myTeamsButton = <div className='active-profile-button' onClick={this.handleSwitch} >
                    {this.props.match.params.username}'s Teams
                </div>
                likedTeamsButton = <div className='disabled-profile-button'>
                    Liked Teams
                </div>;
                currentIndex = this.props.likedTeams.map(team => (
                    <TeamItem
                        key={team._id}
                        team={team}
                        liked={true}
                        fetchTeamLikes={this.props.fetchTeamLikes}
                    />
                ))
            }

            
            return(
                <div className="profile-container">
                    <div className="row">
                        <div className="inner-row first"><h2>Trainer </h2><h1>{this.props.match.params.username}</h1></div>
                        <div className="inner-row"><div className="profile-avatar"></div></div>
                    </div>
                    <div className="button-row">
                        {myTeamsButton}
                        {likedTeamsButton}
                    </div>
                    <div>
                        {currentIndex}
                    </div>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

export default Profile