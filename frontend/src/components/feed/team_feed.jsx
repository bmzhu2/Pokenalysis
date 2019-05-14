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
                    
                    Object.values(props.teams).map((team) => (
                        <TeamItem 
                            key={team._id} 
                            team={team}
                        />
                    ))
                }
            </div>
        )
    } 
}

export default TeamFeed;