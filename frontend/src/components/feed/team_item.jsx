import React from 'react';
import TeamPokemon from './team_pokemon';
import { Link } from 'react-router-dom';


class TeamItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
        }
        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.props.fetchTeamLikes(this.props.team._id).then( likes => {
            return(
                this.setState({
                    likes: likes.likes.length
                }) 
            )
        })  
    }

    handleLike() {
        console.log("liked");
        debugger
        this.props.createLike(this.props.team._id);
        this.setState({
            likes: this.state.likes + 1
        });
    }

    render() {
        if (this.props.team !== undefined && this.state.likes !== undefined){
            return(
                <div className="team-container">
                    <div className="team-top">
                        <h1> {this.props.team.name} </h1>
                        <Link to={`/users/${this.props.team.username}`}><h2> by: {this.props.team.username}</h2></Link>
                    </div>
                    <TeamPokemon pokemon={this.props.team.pokemon} />
                    <div className="row likes">
                        <div className="row-item">
                            <h3>{this.state.likes} Likes </h3>
                        </div>
                        <div className="row-item like" onClick={this.handleLike}>
                            <div className="like-icon"></div>
                            <h3>Like this Team</h3>
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