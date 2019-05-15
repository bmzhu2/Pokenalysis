import React from 'react';


class PokemonAttributes extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: "",
            target: null,
            listType: null,
            displayType: null,
            displayItem: null
        }

        this.updateSearch = this.updateSearch.bind(this)
        this.setMove1 = this.setMove1.bind(this)
        this.setMove2 = this.setMove2.bind(this)
        this.setMove3 = this.setMove3.bind(this)
        this.setMove4 = this.setMove4.bind(this)
        this.setAbility = this.setAbility.bind(this)
        this.setItem = this.setItem.bind(this)
    }

    setMove1(e) {
        let attrs = this.props.team[this.props.slot]
        attrs.move1 = e.currentTarget.value
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }

    setMove2(e) {
        let attrs = this.props.team[this.props.slot]
        attrs.move2 = e.currentTarget.value
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }

    setMove3(e) {
        let attrs = this.props.team[this.props.slot]
        attrs.move3 = e.currentTarget.value
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }

    setMove4(e) {
        let attrs = this.props.team[this.props.slot]
        attrs.move4 = e.currentTarget.value
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }
    
    setAbility(e) {
        let attrs = this.props.team[this.props.slot]
        attrs.ability = e.currentTarget.value
        this.props.updateAttrs(this.props.slot, attrs)
    }

    setItem(e) {
        let attrs = this.props.team[this.props.slot];
        attrs.item = e.currentTarget.value;
        this.props.updateAttrs(this.props.slot, attrs)
    }

    updateSearch(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render(){
        if(!this.props.team[this.props.slot]) {
            return null
        }
        const pokeAttrs = this.props.team[this.props.slot];
        const pokemon = this.props.pokemon[pokeAttrs.pokeId];
        if(!pokemon || !pokemon.abilities) {
            return null
        }

        let abilities = pokemon.abilities.map(ability => {
            return  (
                <label>
                    {ability.ability.name.split('-').join(" ")}
                    <input 
                        type="radio" 
                        name="ability" 
                        value={ability.ability.name} 
                        onClick={this.setAbility}
                    ></input>
                </label>
                )
        })

        let itemsList = 
            Object.keys(this.props.items).map(item => {
                if (!this.state.searchQuery || item.includes(this.state.searchQuery)) {
                    return <option value={item}>{item.split('-').join(" ")}</option>
                }
            //    return ( !this.state.searchQuery ||item.includes(this.state.searchQuery)) ? 
            //     <option value={item} >{item.split('-').join(" ")}</option> : <div></div>
            })
        
        let currentItem = pokemon.item ? pokemon.item : <div>No item</div> 

        let stats = 
            pokemon.stats.reverse().map(stat => {
                return <p>{`${stat.stat.name.split('-').join(" ")}: ${stat.base_stat}`}</p>
            })

        let sortedMoves = pokemon.moves.sort();

        return(
            <div>
                <h1>{pokemon.name}</h1>
                {pokemon.types.join(" ")}
                <div>
                    <h2>Moves</h2>
                    <select name="move-one" value={pokemon.move1} onChange={this.setMove1}>
                        <option selected disabled>Select a move</option>
                        {sortedMoves.map(move => {
                            return <option value={move}>{move.split('-').join(" ")}</option>
                        })}
                    </select>
                    <select name="move-two" value={pokemon.move2} onChange={this.setMove2}>
                        <option selected disabled>Select a move</option>
                        {sortedMoves.map(move => {
                            return <option value={move}>{move.split('-').join(" ")}</option>
                        })}
                    </select>
                    <select name="move-three" value={pokemon.move3} onChange={this.setMove3}>
                        <option selected disabled>Select a move</option>
                        {sortedMoves.map(move => {
                            return <option value={move}>{move.split('-').join(" ")}</option>
                        })}
                    </select>
                    <select name="move-four" value={pokemon.move4} onChange={this.setMove4}>
                        <option selected disabled>Select a move</option>
                        {sortedMoves.map(move => {
                            return <option value={move}>{move.split('-').join(" ")}</option>
                        })}
                    </select>
                    
                </div>
                <div>
                    <h2>Abilities</h2>
                    {abilities}
                </div>
                <div>
                    <h2>Items</h2>
                    {currentItem}
                    <input type="text" onChange={this.updateSearch}></input>
                    <select name="items" size="6" value={pokemon.item} onChange={this.setItems}>
                        {itemsList}
                    </select>
                </div>
                <div>
                    <h2>Stats</h2>
                    {stats}
                </div>
            </div>
        )
    }
}

export default PokemonAttributes;