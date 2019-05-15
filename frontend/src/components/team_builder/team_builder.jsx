import React from 'react';
import TeamSlot from './team_slot';
import Pokemon from './pokemon';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NavbarContainer from '../nav/navbar_container';
import Sidebar from './sidebar';
import { idParse } from '../../reducers/pokemon_reducer';
import PokemonAttributesContainer from './pokemon_attributes_container';
import Filter from './filter';
import './filter.css';
// import { types } from '../../util/type_util'; USE THIS WHEN UTIL FILE IS FIXED
import './team_builder.css';
import StatCharts from './stat_charts'

class TeamBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
            teamName: "",
            team: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
            attrId: "0",
            search: "",
            typeFilter1: "",
            typeFilter2: "",
            openFilter: {
                name: "typeFilter1",
            }
        };
        this.onDrop1 = this.onDrop1.bind(this);
        this.onDrop2 = this.onDrop2.bind(this);
        this.onDrop3 = this.onDrop3.bind(this);
        this.onDrop4 = this.onDrop4.bind(this);
        this.onDrop5 = this.onDrop5.bind(this);
        this.onDrop6 = this.onDrop6.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchPokemon = this.searchPokemon.bind(this);
        this.filterByType = this.filterByType.bind(this)
        this.removeFromTeam = this.removeFromTeam.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.handleTypeFilter = this.handleTypeFilter.bind(this);
        this.sendAttrId = this.sendAttrId.bind(this);
        this.updatePokeAttrs = this.updatePokeAttrs.bind(this);
        this.filterPokemon = this.filterPokemon.bind(this);
    }

    onDrop1(incomingState) {
        const team = Object.assign({}, this.state.team, { 1: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    onDrop2(incomingState) {
        const team = Object.assign({}, this.state.team, { 2: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    onDrop3(incomingState) {
        const team = Object.assign({}, this.state.team, { 3: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    onDrop4(incomingState) {
        const team = Object.assign({}, this.state.team, { 4: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    onDrop5(incomingState) {
        const team = Object.assign({}, this.state.team, { 5: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    onDrop6(incomingState) {
        const team = Object.assign({}, this.state.team, { 6: incomingState });
        this.props.fetchPokemon(incomingState.name);
        this.setState({ team });
    }
    
    componentDidMount(){
        this.props.fetchAllPokemon(0).then(res => {
            this.setState({                
                pokemon: res.pokemon.data.results.map(pokemon => {
                    let id = idParse(pokemon);
                    return {
                        id,
                        name: pokemon.name,
                        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
                    };
                })
            });
        });

        this.props.fetchItems();
    }

    handleScroll() {
        this.setState(({ scrollPosition: window.pageYOffset }));
    }

    updateSearch(){
        return e => this.setState({ search: e.currentTarget.value },
            this.searchPokemon);
    }

    updateTeamName(){
        return e => this.setState({
            teamName: e.currentTarget.value
        });
    }

    searchPokemon(){
        this.setState((state,props) => {
            const pokemon = Object.values(props.pokemon).filter(poke => (
                poke.name.includes(state.search)
            ));
            return { pokemon };
        });
    }

    filterPokemon(...filters){
        const newFilter = filters[0] && filters[1] ? filters : filters[0] ? [filters[0]] : filters[1] ? [filters[1]] : [];
        
        this.setState((state, props) => {
            const pokemon = !newFilter.length ? Object.values(props.pokemon) : Object.values(props.pokemon).filter(poke => {
                return !!poke.types && newFilter.every(filter => poke.types.includes(filter));
            });
            return { pokemon };
        });
    }

    async filterByType(filter, type){
        const filters = Object.assign(this.state);
        filters[filter] = type;

        const { typeFilter1, typeFilter2 } = filters;
        
            if (typeFilter1 && !typeFilter2) {
                await this.props.fetchByType(typeFilter1);
                this.filterPokemon(typeFilter1, typeFilter2);      
            } else if (!typeFilter1 && typeFilter2) {
                await this.props.fetchByType(typeFilter2);
                this.filterPokemon(typeFilter1, typeFilter2);   
            } else if (typeFilter1 && typeFilter2) {
                await this.props.fetchByType(typeFilter1).then(() => this.props.fetchByType(typeFilter2));
                this.filterPokemon(typeFilter1, typeFilter2);
            } else {
                this.filterPokemon(typeFilter1, typeFilter2);
            }
    }
  
    removeFromTeam(id){
        const team = Object.assign({}, this.state.team, { [id]: {}});
        this.setState({
            team,
        });
    }

    handleSubmit(e){
        e.preventDefault();
        // for search submit
        // should do a request?
    }

    saveTeam(){
        const { createTeam } = this.props;
        const { team, teamName } = this.state;
        let pokemon = Object.values(team);
        const nullifiedPokes = pokemon.map(poke => {
            return (!Object.values(poke).length) ? { pokeId: 0, name: "Missingno" } : poke;
        });
        const newTeam = { name: teamName, pokemon: nullifiedPokes };
        createTeam(newTeam);
    }   

    handleOpenFilter(filter){
        let openFilter = this.state.openFilter;
        openFilter.name = filter;
        this.setState({
            openFilter,
        });
    }

    handleTypeFilter(filter, type){
        this.setState(() => ({ [filter]: type }));
        this.filterByType(filter, type);
    }

    clearFilter(filter){
        this.setState({ [filter]: "" }); 
        this.filterByType(filter, "");
    }

    updatePokeAttrs(id, attrs){
        let team = this.state.team;
        team[id] = attrs;
        this.setState(() => ({ team }));
    }

    sendAttrId(id){
        this.setState((this.state.attrId === id) ? { attrId: 0 } : { attrId: id });
    }

    render(){
        const { pokemon, team, openFilter, typeFilter1, typeFilter2 } = this.state;
        const { fetchPokemon, fetchItem, fetchItems, fetchMove, fetchAbility, } = this.props;
        const pokemonComponents = pokemon.map(poke => {
            return(
                <Pokemon key={poke.name} name={poke.name} sprite={poke.sprite} id={poke.id}/>
            );
        });
        return(
            <div>
            <div className="team-builder-container">
                <div>
                    <div className="name-submit-container">
                        <input className="team-name" onChange={this.updateTeamName()} type="text" placeholder={"New Team"}/>
                        <input className="submit-team" onClick={this.saveTeam} type="submit" value="Save"/>
                    </div>
                    <ul className="team-slots-container"> 
                        <TeamSlot setAttrId={() => this.sendAttrId("1")} key="team-slot-1" id="1" onDrop={this.onDrop1} pokeId={team[1].id} name={team[1].name} sprite={team[1].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot setAttrId={() => this.sendAttrId("2")} key="team-slot-2" id="2" onDrop={this.onDrop2} pokeId={team[2].id} name={team[2].name} sprite={team[2].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot setAttrId={() => this.sendAttrId("3")} key="team-slot-3" id="3" onDrop={this.onDrop3} pokeId={team[3].id} name={team[3].name} sprite={team[3].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot setAttrId={() => this.sendAttrId("4")} key="team-slot-4" id="4" onDrop={this.onDrop4} pokeId={team[4].id} name={team[4].name} sprite={team[4].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot setAttrId={() => this.sendAttrId("5")} key="team-slot-5" id="5" onDrop={this.onDrop5} pokeId={team[5].id} name={team[5].name} sprite={team[5].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot setAttrId={() => this.sendAttrId("6")} key="team-slot-6" id="6" onDrop={this.onDrop6} pokeId={team[6].id} name={team[6].name} sprite={team[6].sprite} removeFromTeam={this.removeFromTeam}/>
                    </ul>
                </div>
                <PokemonAttributesContainer
                    updatePokeAttrs={this.updatePokeAttrs}
                    team={this.state.team}
                    slot={this.state.attrId}
                />
                {/* <div>
                    <StatCharts team={this.state.team} pokemon={this.props.pokemon} />
                </div> */}
                <div className="filters">
                    <form onSubmit={this.handleSubmit}>
                        <input className="search" onChange={this.updateSearch()} type="text" placeholder="search by name"/>
                        <input className="search-button" type="submit" value="Search"/>
                    </form>
                    <div className="filter-headers-container">
                        <div className="filter-header-container"onClick={() => this.handleOpenFilter("typeFilter1")}>
                            <h2 className={(openFilter.name === "typeFilter1") ? "filter-header open" : "filter-header"}>
                                { `${typeFilter1 || "filter 1"}` } 
                            </h2>
                            <h3 className="x" onClick={() => this.clearFilter("typeFilter1")}>X</h3>
                        </div>
                        <div className="filter-header-container" onClick={() => this.handleOpenFilter("typeFilter2")}>
                            <h2 className={(openFilter.name === "typeFilter2") ? "filter-header open" : "filter-header"}>
                                {`${typeFilter2 || "filter 2"}`}
                            </h2>
                            <h3 className="x" onClick={() => this.clearFilter("typeFilter2")}>X</h3>
                        </div>
                    </div>
                </div>
                <Filter handleTypeFilter={this.handleTypeFilter} 
                        typeFilter={this.state[openFilter.name]}
                        name={openFilter.name}
                        />
                <div>
                    <ul className="pokemon-index">
                        {pokemonComponents}
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(TeamBuilder);