import React from 'react';
import TeamItem from './team_item';

const TeamFeed = (props) => {
    if(Object.values(props.teams).length === 0 ) {
        return (
            <h2>Loading...</h2>
        )
    } else {
        return(
            <div className='teams-container'>
                {   
                    Object.values(props.teams).map((team) =>  {
                        let currentUser;
                        if (props.currentUser === undefined) {
                            currentUser = {}
                        } else {
                            currentUser = props.currentUser;
                        }
                        let liked = Object.values(props.likes).some( like => (
                            like.team === team._id && like.user === currentUser.id
                        ));
                        if (liked) {
                            return (<TeamItem
                                        key={team._id}
                                        team={team}
                                        fetchTeamLikes={props.fetchTeamLikes}
                                        createLike={props.createLike}
                                        liked={true}
                                        currentUser={currentUser}
                                        openModal={props.openModal}
                                    />)
                        } else {
                            return(
                                <TeamItem 
                                    key={team._id} 
                                    team={team}
                                    fetchTeamLikes={props.fetchTeamLikes}
                                    createLike={props.createLike}
                                    liked={false}
                                    currentUser={currentUser}
                                    openModal={props.openModal}
                                />
                            )
                        }  
                    })
                }
            </div>
        )
    } 
}

export default TeamFeed;