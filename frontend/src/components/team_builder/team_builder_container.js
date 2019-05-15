import { connect } from 'react-redux';
import {
    fetchTeams,
    fetchTeam,
    fetchUserTeams,
    createTeam,
    updateTeam,
    deleteTeam    
} from '../../actions/team_actions';

import { 
    fetchPokemon,
    fetchManyPokemon,
    fetchAllPokemon,
    fetchByType,
    fetchItem,
    fetchItems,
    fetchMove,
    fetchAbility
} from '../../actions/poke_api_actions';

import { openModal } from '../../actions/modal_actions';

import TeamBuilder from './team_builder';

const mapStateToProps = (state, ownProps) => {
    return({
        loggedIn: state.session.isAuthenticated,
        teams: state.entities.teams,
        pokemon: state.entities.pokemon,
        moves: state.entities.moves,
        items: state.entities.items,
        abilities: state.entities.abilities,
    });
};

const mapDispatchToProps = dispatch => {
    return({
        fetchTeam: teamId => dispatch(fetchTeam(teamId)),
        fetchUserTeams: userId => dispatch(fetchUserTeams(userId)),
        createTeam: team => dispatch(createTeam(team)),
        updateTeam: team => dispatch(updateTeam(team)),
        deleteTeam: teamId => dispatch(deleteTeam(teamId)),

        fetchPokemon: name => dispatch(fetchPokemon(name)),
        fetchAllPokemon: () => dispatch(fetchAllPokemon()),
        fetchManyPokemon: startIdx => dispatch(fetchManyPokemon(startIdx)),
        fetchByType: type => dispatch(fetchByType(type)),

        fetchItem: name => dispatch(fetchItem(name)),
        fetchItems: () => dispatch(fetchItems()),
        fetchMove: name => dispatch(fetchMove(name)),
        fetchAbility: name => dispatch(fetchAbility(name)),

        openModal: mode => dispatch(openModal(mode))
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(TeamBuilder);