import React from 'react';
import TeamPokemon from './team_pokemon';

class TeamItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if ( this.props.team !== undefined){
            return(
                <div className="team-container">
                    <h1> {this.props.team.name} </h1>
                    <h2> by: {this.props.team.username} </h2>
                    <TeamPokemon pokemon={this.props.team.pokemon} />
                </div>
            )
        } else {
            return(
                <h2>Loading...</h2>
            )
        }
    }
}

export default TeamItem;