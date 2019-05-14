import React from 'react';
import TeamSlot from './team_slot';
import Pokemon from './pokemon';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { idParse } from '../../reducers/pokemon_reducer';
import './team_builder.css';

class TeamBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
            team: {
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
                6: {}
            },
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
        window.addEventListener('scroll', this.handleScroll);

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
        
    }

    handleScroll() {
        this.setState(() => ({ scrollPosition: window.pageYOffset }));
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

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.search);
    }

    render(){
        console.log(this.state.search);
        const { pokemon, team } = this.state;
        const pokemonComponents = pokemon.map(poke => {
            return(
                <Pokemon key={poke.name} name={poke.name} sprite={poke.sprite}/>
            );
        });
        return(
            <div>
            <div>
                This is a sidebar
                <ul></ul>
            </div>
            <div className="team-builder-container">
                <div>
                    <ul className="team-container"> 
                    <div className="team-slot-container">
                        <TeamSlot onDrop={this.onDrop1} name={team[1].name} sprite={team[1].sprite}/>
                        <TeamSlot onDrop={this.onDrop2} name={team[2].name} sprite={team[2].sprite}/>
                        <TeamSlot onDrop={this.onDrop3} name={team[3].name} sprite={team[3].sprite}/>
                    </div>
                    <div className="team-slot-container">
                        <TeamSlot onDrop={this.onDrop4} name={team[4].name} sprite={team[4].sprite}/>
                        <TeamSlot onDrop={this.onDrop5} name={team[5].name} sprite={team[5].sprite}/>
                        <TeamSlot onDrop={this.onDrop6} name={team[6].name} sprite={team[6].sprite}/>
                    </div>
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