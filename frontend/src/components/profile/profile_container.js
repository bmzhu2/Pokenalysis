import { fetchUserComments } from '../../actions/comment_actions';
import { fetchUserTeams } from '../../actions/team_actions';
import { connect } from 'react-redux'
import Profile from './profile'

const mapStateToProps = state => {
    user = state.session.user;
    teams = state.entities.teams;
    comments = state.entities.comments;
}

const mapDispatchToBanana = dispatch => {
    fetchUserTeams = userId => dispatch(fetchUserTeams(userId)),
    fetchUserComments = userId => dispatch(fetchUserComments(userId))
}

export default connect({
    mapStateToProps,
    mapDispatchToBanana
})(Profile)