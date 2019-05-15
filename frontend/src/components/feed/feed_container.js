import { connect } from 'react-redux';
import { fetchTeams } from '../../actions/team_actions';
import { fetchUser } from '../../actions/user_actions';
import { fetchTeamLikes, createLike, fetchLikes } from '../../actions/like_actions'; 
import Feed from './feed';

const mapStateToProps = state => {
    return ({
        currentUser: state.session.user,
        errors: state.errors.session,
        teams: state.entities.teams,
        users: state.entities.users,
        likes: state.entities.likes
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchTeams: () => dispatch(fetchTeams()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        fetchTeamLikes: (teamId) => dispatch(fetchTeamLikes(teamId)),
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (teamId) => dispatch(createLike(teamId)),
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(Feed);