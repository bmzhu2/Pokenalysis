import React from 'react';

class TeamPoke extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.poke !== null) {
            return (
                <div className="poke-container">
                    <div className="poke-circle">
                        <div className="poke-pic"
                            style={{
                                backgroundImage:
                                    `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.poke.pokeId}.png)`
                            }}>
                        </div>
                    </div>
                    <h3> {this.props.poke.pokeId} </h3>                    
                </div>
            )
        } else {
            return (
                <div className="poke-container">
                    <div className="poke-circle"> 
                        
                    </div>
                    <h3> Loading...</h3>
                </div>
            )
        }
    }
}

export default TeamPoke;