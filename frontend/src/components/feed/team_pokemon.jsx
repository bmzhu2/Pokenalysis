import React from 'react';
import TeamPoke from './team_poke';


class TeamPokemon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.pokemon !== undefined) {
            return (
                <div className="poke-list-container">
                    <h1> {this.props.pokemon.name} </h1>
                    {this.props.pokemon.map( poke => (
                        <TeamPoke poke={poke} />
                    ))}
                </div>
            )
        } else {
            return (
                <h2>Loading...</h2>
            )
        }
    }
}

export default TeamPokemon;