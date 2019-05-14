import { connect } from 'react-redux';
import { fetchTeams } from '../../actions/team_actions';
import { fetchUser } from '../../actions/user_actions';
import Feed from './feed';

const mapStateToProps = state => {
    return ({
        currentUser: state.session.id,
        errors: state.errors.session,
        teams: state.entities.teams,
        users: state.entities.users,
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchTeams: () => dispatch(fetchTeams()),
        fetchUser: (id) => dispatch(fetchUser(id)),
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(Feed);