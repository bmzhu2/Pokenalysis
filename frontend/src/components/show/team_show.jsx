import React from 'react';
import StatCharts from '../team_builder/stat_charts'
import TeamPoke from '../feed/team_poke'
import ShowAttributes from './show_attributes'

class TeamShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            slot: null,
            commentText: "",
            likes: this.props.likes.length
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAttributes = this.handleAttributes.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLike = this.handleLike.bind(this)
    }

    componentDidMount(){
        let teamId = this.props.match.params.teamId;
        this.props.fetchTeam(teamId);
        this.props.fetchTeamComments(teamId);
        this.props.fetchTeamLikes(teamId)
    }

    handleSubmit(e){
        e.preventDefault()
        debugger
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
        console.log("liked");
        this.props.createLike(this.props.team._id).then(() => (
            this.setState({
                likes: this.state.likes + 1
            })
        ));
    }

    render(){
        if(this.props.team){
            let newForm = null
            if(this.props.currentUser){
                newForm = <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.commentText} onChange={this.handleChange}></textarea>
                    <input type="submit" value="Create Comment"/>
                </form>
            }
            return(
                <div>
                    <ul>
                        {this.props.team.pokemon.map((mon, idx) => {
                            return <li onClick={this.handleAttributes} value={idx} ><TeamPoke poke={mon}/></li>
                        })}
                    </ul>
                    <ShowAttributes pokemon={this.props.team.pokemon[this.state.slot]} />
                    <div>
                        Number Of Likes {this.state.likes}
                    </div>
                    <div className="row-item like" onClick={this.handleLike}>
                        <div className="like-icon"></div>
                        <h3>Like this Team</h3>
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