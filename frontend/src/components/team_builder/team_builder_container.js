import { connect } from 'react-redux';
import {
    fetchTeams,
    fetchTeam,
    fetchUserTeams,
    createTeam,
    updateTeam,
    deleteTeam
} from '../../actions/team_actions';
import TeamBuilder from './team_builder';

const mapStateToProps = (state, ownProps) => {
    return({
        teams: state.entities.teams
    });
};

const mapDispatchToProps = dispatch => {
    return({
        fetchTeams: () => dispatch(fetchTeams()),
        fetchTeam: teamId => dispatch(fetchTeam(teamId)),
        fetchUserTeams: userId => dispatch(fetchUserTeams(userId)),
        createTeam: team => dispatch(createTeam(team)),
        updateTeam: team => dispatch(updateTeam(team)),
        deleteTeam: teamId => dispatch(deleteTeam(teamId)),
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamBuilder);