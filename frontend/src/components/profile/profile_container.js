
import { fetchUserLikes, fetchTeamLikes } from '../../actions/like_actions';
import { fetchTeams } from '../../actions/team_actions';
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux'
import Profile from './profile'
import { userTeams, likedTeams } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.username],
    userTeams: userTeams(state.entities.teams, ownProps.match.params.username),
    likedTeams: likedTeams(state.entities, ownProps.match.params.username)
})

const mapDispatchToBanana = dispatch => ({
    fetchTeams: () => dispatch(fetchTeams()),
    fetchUserLikes: username => dispatch(fetchUserLikes(username)),
    fetchUser: username => dispatch(fetchUser(username)),
    fetchTeamLikes: (teamId) => dispatch(fetchTeamLikes(teamId)),
})

export default connect(mapStateToProps, mapDispatchToBanana)(Profile)