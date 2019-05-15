import { connect } from 'react-redux';
import TeamShow from './team_show';
import { fetchTeam } from '../../actions/team_actions'
import { fetchTeamComments, createComment } from '../../actions/comment_actions'
import { fetchPokemon, 
        fetchItem,
        fetchItems,
        fetchMove,
        fetchAbility
    } from '../../actions/poke_api_actions'
import { fetchTeamLikes, createLike } from '../../actions/like_actions'
import { teamComments, teamLikes } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => ({
    team: state.entities.teams[ownProps.match.params.teamId],
    pokemon: state.entities.pokemon,
    comments: teamComments(state.entities, ownProps.match.params.teamId),
    likes: teamLikes(state.entities, ownProps.match.params.teamId),
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    fetchTeam: teamId => dispatch(fetchTeam(teamId)),
    fetchTeamComments: teamId => dispatch(fetchTeamComments(teamId)),
    createComment: comment => dispatch(createComment(comment)),
    fetchPokemon: pokeId => dispatch(fetchPokemon(pokeId)),
    fetchTeamLikes: teamId => dispatch(fetchTeamLikes(teamId)),

    fetchItem: name => dispatch(fetchItem(name)),
    fetchItems: () => dispatch(fetchItems()),
    fetchMove: name => dispatch(fetchMove(name)),
    fetchAbility: name => dispatch(fetchAbility(name)),
    createLike: teamId => dispatch(createLike(teamId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamShow)