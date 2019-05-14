
import { fetchUserLikes } from '../../actions/like_actions';
import { fetchTeams } from '../../actions/team_actions';
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux'
import Profile from './profile'
import { userTeams, likedTeams } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId],
    userTeams: userTeams(state.entities.teams, ownProps.match.params.userId),
    likedTeams: likedTeams(state.entities, ownProps.match.params.userId)
})

const mapDispatchToBanana = dispatch => ({
    fetchTeams: () => dispatch(fetchTeams()),
    fetchUserLikes: userId => dispatch(fetchUserLikes(userId)),
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect({
    mapStateToProps,
    mapDispatchToBanana
})(Profile)