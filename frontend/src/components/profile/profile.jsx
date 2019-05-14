import React from 'react'

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
                    My Teams
                </div>;
                likedTeamsButton = <div onClick={this.handleSwitch} className='active-profile-button'>
                    Liked Teams
                </div>;
                // Object.
            }else{
                myTeamsButton = <div className='active-profile-button' onClick={this.handleSwitch} >
                    My Teams
                </div>
                likedTeamsButton = <div className='disabled-profile-button'>
                    Liked Teams
                </div>;
            }

            
            return(
                <div className="profile-container">
                    <div>
                        {this.props.match.params.username}
                    </div>
                    <div>
                        {myTeamsButton}
                        {likedTeamsButton}
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