import React from 'react';
import TeamPokemon from './team_pokemon';

class TeamItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.team.user)        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.users !== this.props.users) {
            this.setState({
                username: this.props.users[this.props.team.user]
            })
        }
    }

    render() {
        if ( this.props.team !== undefined && this.state.username !== ""){
            return(
                <div className="team-container">
                    <h1> {this.props.team.name} </h1>
                    <h2> by: {this.state.username} </h2>
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