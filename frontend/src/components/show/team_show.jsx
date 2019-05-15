import React from 'react';
import StatCharts from '../team_builder/stat_charts'
import TeamPoke from '../feed/team_poke'
import ShowAttributes from './show_attributes'
import './show.css';

class TeamShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            slot: null,
            commentText: "",
            likes: this.props.teamLikes.length,
            liked: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAttributes = this.handleAttributes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);
    }

    componentDidMount(){
        let teamId = this.props.match.params.teamId;
        this.props.fetchTeam(teamId);
        this.props.fetchTeamComments(teamId);
        this.props.fetchTeamLikes(teamId)
    }

    handleSubmit(e){
        e.preventDefault()
        if (!this.props.loggedIn) {
          this.props.openModal("login");
          return;
        }
        const newComment = {
            text: this.state.commentText,
            user: this.props.currentUser.id,
            username: this.props.currentUser.username,
            teamId: this.props.match.params.teamId
        }
        this.props.createComment(newComment)
        this.setState({commentText: ''})
    }

    handleChange(e){
        this.setState({commentText: e.target.value})
    }

    handleAttributes(e){
        this.setState({slot: e.currentTarget.value});
    }

    handleLike() {
        if (!this.props.loggedIn) {
            this.props.openModal("login");
            return
        }
        console.log("liked");
        this.props.createLike(this.props.team._id).then(() => (
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

    render(){
        let like;
        if (this.state.liked === false) {
            like =  <div className="row item like" onClick={this.handleLike}>
                        <div className="like-icon"></div>
                        <h3>Like Team</h3>
                    </div>
        } else {
            like =  <div className="row item like" onClick={this.handleUnLike}>
                        <div className="unlike-icon"></div>
                        <h3>UnLike Team</h3>
                    </div>
        }
        if(this.props.team){
            let newForm = null
            if(this.props.currentUser){
                newForm = <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.commentText} onChange={this.handleChange}></textarea>
                    <input type="submit" value="Create Comment"/>
                </form>
            }
            return(
                <div className="team-show">
                    <ul className="poke-row">
                        {this.props.team.pokemon.map((mon, idx) => {
                            return <li onClick={this.handleAttributes} value={idx} ><TeamPoke poke={mon}/></li>
                        })}
                    </ul>
                    <ShowAttributes pokemon={this.props.team.pokemon[this.state.slot]} />
                    <div className="row likes">
                        {like}
                        <h3 className="team-likes">{this.state.likes} Likes </h3>
                    </div>
      
                    <div>
                        {this.props.comments.map(comment => {
                            return(
                                <div className='comment-index-item'>
                                    {comment.username + ': ' + comment.text}
                                </div>
                            )
                        })}
                        {newForm}
                    </div>
                </div>
            )
        } else{
            return <h1>Who's That Pokemon...</h1>
        }
    }
}

export default TeamShow