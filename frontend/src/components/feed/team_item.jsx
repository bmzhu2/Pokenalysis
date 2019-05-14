import React from 'react';
import TeamPokemon from './team_pokemon';
import { Link } from 'react-router-dom';


class TeamItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
        }
    }

    componentDidMount() {
        this.props.fetchTeamLikes(this.props.team._id).then( likes => (
            this.setState({
                likes: likes
            }) 
        ))
    }

    render() {
        if ( this.props.team !== undefined){
            return(
                <div className="team-container">
                    <div className="team-top">
                        <h1> {this.props.team.name} </h1>
                        <Link to={`/users/${this.props.team.user}`}><h2> by: {this.props.team.username}</h2></Link>
                    </div>
                    <TeamPokemon pokemon={this.props.team.pokemon} />
                    <div className="row">
                        <div className="row-item">
                            <div className="heart-icon"></div>                        
                            <h3>{this.state.likes} Likes </h3>
                        </div>
                        <h3>0 Comments</h3> 
                    </div>
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