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
                    Object.values(props.teams.data).map((team, index) => (
                        <TeamItem 
                            key={props.teams.data[index]._id} 
                            team={props.teams.data[index]}
                            users={props.users}
                            fetchUser={props.fetchUser}
                        />
                    ))
                }
            </div>
        )
    } 
}

export default TeamFeed;