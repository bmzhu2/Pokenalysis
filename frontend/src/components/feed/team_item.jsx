import React from 'react';
import TeamPokemon from './team_pokemon';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteTeam} from '../../actions/team_actions'

class TeamItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            liked: this.props.liked
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

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.liked !== this.props.liked) {
            this.setState({
                liked: this.props.liked
            })
        }
    }

    handleLike() {
        if (Object.keys(this.props.currentUser).length === 0) {
            this.props.openModal("login");
            return
        }
        this.props.createLike(this.props.team._id).then( () => (
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
        ));
    }

    handleUnLike() {
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
                <div className="unlike-icon"></div>
                <h3>UnLike Team</h3>
            </div>
        }
        let deleteButton;
        let editButton;
        if (this.props.currentUser && this.props.currentUser.username === this.props.team.username) {
            deleteButton = (<button className="team-delete" onClick={() => this.props.deleteTeam(this.props.team._id)}>
                <i className="fas fa-trash-alt"></i></button>)
            editButton = (<button className="team-edit" onClick={() => this.props.history.push(`/edit/${this.props.team._id}`)}>
                <i className="fas fa-edit"></i></button>)
        }


        if (this.props.team !== undefined && this.state.likes !== undefined){
            return(
                <div className="team-container">
                    <div className="team-top">
                        <Link to={`/teams/${this.props.team._id}`}><h1> {this.props.team.name}</h1></Link>
                        <Link to={`/users/${this.props.team.username}`}><h2> by: {this.props.team.username}</h2></Link>
                    </div>
                    <div className="team-controls">
                        {editButton}
                        {deleteButton}
                    </div>
                    <TeamPokemon pokemon={this.props.team.pokemon} />
                    <div className="row likes">
                        <h3>{this.state.likes} Likes </h3>
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

const mapStateToProps = state => ({
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    deleteTeam: id => dispatch(deleteTeam(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamItem));