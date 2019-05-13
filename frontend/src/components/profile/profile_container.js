import { fetchUserComments } from '../../actions/comment_actions';
import { fetchUserTeams } from '../../actions/team_actions';
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux'
import Profile from './profile'

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId],
    teams: state.entities.teams,
    comments: state.entities.comments
})

const mapDispatchToBanana = dispatch => ({
    fetchUserTeams: userId => dispatch(fetchUserTeams(userId)),
    fetchUserComments: userId => dispatch(fetchUserComments(userId)),
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect({
    mapStateToProps,
    mapDispatchToBanana
})(Profile)