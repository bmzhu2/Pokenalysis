import React from 'react';
import TeamPokemon from './team_pokemon';
import { Link } from 'react-router-dom';


class TeamItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            liked: false
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);

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
        this.props.createLike(this.props.team._id).then( () => (
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
        ));
    }

    handleUnLike() {
        console.log("unliked");
        // this.props.createLike(this.props.team._id).then(() => (
            this.setState({
                likes: this.state.likes - 1,
                liked: false
            })
        // ));
    }

    render() {
        let like;
        if (this.state.liked === false) {
            like = <div className="row-item like" onClick={this.handleLike}>
                        <div className="like-icon"></div>
                        <h3>Like Team</h3>
                    </div>
        } else {
            like = <div className="row-item like" onClick={this.handleUnLike}>
                <div className="like-icon"></div>
                <h3>UnLike Team</h3>
            </div>
        }
        if (this.props.team !== undefined && this.state.likes !== undefined){
            return(
                <div className="team-container">
                    <div className="team-top">
                        <Link to={`/teams/${this.props.team._id}`}><h1> {this.props.team.name}</h1></Link>
                        <Link to={`/users/${this.props.team.username}`}><h2> by: {this.props.team.username}</h2></Link>
                    </div>
                    <TeamPokemon pokemon={this.props.team.pokemon} />
                    <div className="row likes">
                        <div className="row-item">
                            <h3>{this.state.likes} Likes </h3>
                        </div>
                        {like}
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