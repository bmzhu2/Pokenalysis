import React from 'react';
import TeamSlot from './team_slot';
import Pokemon from './pokemon';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NavbarContainer from '../nav/navbar_container';
import Sidebar from './sidebar';
import { idParse } from '../../reducers/pokemon_reducer';
import './team_builder.css';

class TeamBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
            team: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
            search: "",
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
        this.removeFromTeam = this.removeFromTeam.bind(this);
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
        // window.addEventListener('scroll', this.handleScroll);

        this.props.fetchAllPokemon(0).then(res => {
            this.setState({                
                pokemon: res.pokemon.data.results.map(pokemon => {
                    let id = idParse(pokemon);
                    return {
                        name: pokemon.name,
                        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
                    };
                })
            });
        }); 
        
        const targets = document.querySelectorAll('img');

        const lazyLoad = target => {
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    console.log(entry);

                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-lazy');

                        img.setAttribute('src', src);

                        observer.disconnect();
                    }
                });
            });
            io.observe(target);
        };
        targets.forEach(lazyLoad);
    }

    handleScroll() {
        this.setState(({ scrollPosition: window.pageYOffset }));
    }

    updateSearch(){
        return e => this.setState({ search: e.currentTarget.value },
            this.filterPokemon);
    }

    filterPokemon(){
        this.setState((state,props) => {
            const pokemon = Object.values(props.pokemon).filter(poke => (
                poke.name.includes(state.search)
            ));
            return { pokemon };
        });
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

    render(){
        const { pokemon, team } = this.state;
        const pokemonComponents = pokemon.map(poke => {
            return(
                <Pokemon key={poke.name} name={poke.name} sprite={poke.sprite}/>
            );
        });
        return(
            <div>
            <div className="team-builder-container">
                <div>
                    <ul className="team-slots-container"> 
                        <TeamSlot id="1" onDrop={this.onDrop1} name={team[1].name} sprite={team[1].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot id="2" onDrop={this.onDrop2} name={team[2].name} sprite={team[2].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot id="3" onDrop={this.onDrop3} name={team[3].name} sprite={team[3].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot id="4" onDrop={this.onDrop4} name={team[4].name} sprite={team[4].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot id="5" onDrop={this.onDrop5} name={team[5].name} sprite={team[5].sprite} removeFromTeam={this.removeFromTeam}/>
                        <TeamSlot id="6" onDrop={this.onDrop6} name={team[6].name} sprite={team[6].sprite} removeFromTeam={this.removeFromTeam}/>
                    </ul>
                </div>
                <div>Additional team info that will only be visible when selected</div>
                <div className="filters">
                    <form onSubmit={this.handleSubmit}>
                        <input className="search" onChange={this.updateSearch()} type="text" placeholder="search by name"/>
                        <input className="search-button" type="submit" value="Search"/>
                    </form>
                    <div>
                        <div>filter 1</div>
                        <div>filter 2</div>
                        <div>filter 3</div>
                    </div>
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