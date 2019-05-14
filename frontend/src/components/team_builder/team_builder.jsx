import React from 'react';
import TeamSlot from './team_slot';
import Pokemon from './pokemon';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NavbarContainer from '../nav/navbar_container';
import Sidebar from './sidebar';
import { idParse } from '../../reducers/pokemon_reducer';
import PokemonAttributes from './pokemon_attributes';
import Filter from './filter';
// import { types } from '../../util/type_util'; USE THIS WHEN UTIL FILE IS FIXED
import './team_builder.css';

class TeamBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
            teamName: "",
            team: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
            pokeAttrs: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
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
        this.filterPokemon = this.filterPokemon.bind(this);
        this.filterByType = this.filterByType.bind(this)
        this.removeFromTeam = this.removeFromTeam.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.handleTypeFilter = this.handleTypeFilter.bind(this)
    }

    onDrop1(incomingState) {
        const team = Object.assign({}, this.state.team, { 1: incomingState });
        this.setState({ team });
    }
    onDrop2(incomingState) {
        const team = Object.assign({}, this.state.team, { 2: incomingState });
        this.setState({ team });
    }
    onDrop3(incomingState) {
        const team = Object.assign({}, this.state.team, { 3: incomingState });
        this.setState({ team });
    }
    onDrop4(incomingState) {
        const team = Object.assign({}, this.state.team, { 4: incomingState });
        this.setState({ team });
    }
    onDrop5(incomingState) {
        const team = Object.assign({}, this.state.team, { 5: incomingState });
        this.setState({ team });
    }
    onDrop6(incomingState) {
        const team = Object.assign({}, this.state.team, { 6: incomingState });
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
    }

    handleScroll() {
        this.setState(({ scrollPosition: window.pageYOffset }));
    }

    updateSearch(){
        return e => this.setState({ search: e.currentTarget.value },
            this.filterPokemon);
    }

    updateTeamName(){
        return e => this.setState({
            teamName: e.currentTarget.value
        });
    }

    filterPokemon(){
        this.setState((state,props) => {
            const pokemon = Object.values(props.pokemon).filter(poke => (
                poke.name.includes(state.search)
            ));
            return { pokemon };
        });
    }

    filterByType(){
        const typeFilter1 = this.state.typeFilter1;
        const typeFilter2 = this.state.typeFilter2;
        if(typeFilter1 !== "" && typeFilter2 === ""){
            let newPokemon = []
            this.props.fetchByType(this.state.typeFilter1)
                .then(() => {
                let allPokemon = Object.values(this.props.pokemon)
                newPokemon = []
                allPokemon.forEach(pokemon => {
                    if(pokemon.types){
                        if(pokemon.types.includes(typeFilter1)){
                            newPokemon.push(pokemon)
                        }
                    }
                    
                });
                this.setState({pokemon: newPokemon})
            });
        } else if (typeFilter1 === "" && typeFilter2 !== ""){
            this.props.fetchByType(typeFilter2)
                .then(()=> {
                    let allPokemon = Object.values(this.props.pokemon)
                    let newPokemon = []
                    allPokemon.forEach(pokemon => {
                        if (pokemon.types) {
                            if (pokemon.types.includes(typeFilter2)) {
                                newPokemon.push(pokemon)
                            }
                        }
                    })
                this.setState({ pokemon: newPokemon })
            })
        } else if (typeFilter1 !== "" && typeFilter2 !== ""){
            this.props.fetchByType(typeFilter2)
                .then(() => this.props.fetchByType(typeFilter1)
                    .then(() => {
                        let allPokemon = Object.values(this.props.pokemon)
                        let newPokemon = []
                        allPokemon.forEach(pokemon => {
                            if (pokemon.types) {
                                if (pokemon.types.includes(typeFilter2) && pokemon.types.includes(typeFilter1)) {
                                    newPokemon.push(pokemon)
                                }
                            }
                        })
                        this.setState({ pokemon: newPokemon })
                    }))
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
        this.setState(() => ({
            [filter]: type 
        }), this.filterByType());
    }

    updatePokeAttrs(){
        //set state of attrs here
    }

    render(){
        const { pokemon, team, openFilter } = this.state;
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
                    <input onChange={this.updateTeamName()} type="text" placeholder={this.state.teamName}/>
                    <input onClick={this.saveTeam} type="submit" value="Save"/>
                    <ul className="team-slots-container"> 
                        <TeamSlot key="team-slot-1" id="1" onDrop={this.onDrop1} id={team[1].id} name={team[1].name} sprite={team[1].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot key="team-slot-2" id="2" onDrop={this.onDrop2} id={team[2].id} name={team[2].name} sprite={team[2].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot key="team-slot-3" id="3" onDrop={this.onDrop3} id={team[3].id} name={team[3].name} sprite={team[3].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot key="team-slot-4" id="4" onDrop={this.onDrop4} id={team[4].id} name={team[4].name} sprite={team[4].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot key="team-slot-5" id="5" onDrop={this.onDrop5} id={team[5].id} name={team[5].name} sprite={team[5].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot key="team-slot-6" id="6" onDrop={this.onDrop6} id={team[6].id} name={team[6].name} sprite={team[6].sprite} removeFromTeam={this.removeFromTeam}/>
                    </ul>
                </div>
                <PokemonAttributes
                    fetchPokemon={fetchPokemon}
                    fetchItem={fetchItem}
                    fetchMove={fetchMove}
                    fetchAbility={fetchAbility}
                    updatePokeAttrs={this.updatePokeAttrs}
                />
                <div className="filters">
                    <form onSubmit={this.handleSubmit}>
                        <input className="search" onChange={this.updateSearch()} type="text" placeholder="search by name"/>
                        <input className="search-button" type="submit" value="Search"/>
                    </form>
                    <div>
                        <div onClick={() => this.handleOpenFilter("typeFilter1")}>filter 1</div>
                        <div onClick={() => this.handleOpenFilter("typeFilter2")}>filter 2</div>
                    </div>
                    <Filter handleTypeFilter={this.handleTypeFilter} 
                            filterByType={this.filterByType}
                            name={openFilter.name}
                            />
                </div>
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