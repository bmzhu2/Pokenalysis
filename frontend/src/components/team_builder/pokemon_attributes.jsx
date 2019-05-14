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
    }

    updateSearch(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render(){
        if(!this.props.team[this.props.slot].pokeId) {
            return null
        }
        const pokeAttrs = this.props.team[this.props.slot]
        const pokemon = this.props.pokemon[pokeAttrs.pokeId];
        debugger;
        if(!pokemon) {
            return null
        }

        let abilities = pokemon.abilities.map(ability => {
            return  (
                <input type="radio" name="ability" value={ability.name} onClick={this.props.updateAttrs}>
                    {ability.name}
                </input>)
        })

        debugger;
        
        return(
            <div>
                {pokemon.name}
                {pokemon.types.join(" ")}
                <div>
                    <h2>Moves</h2>
                    <select name="move-one" onChange={this.props.updateAttrs}>
                        {pokemon.moves.map(idx => {
                            return <option value={idx.move.name}>{idx.move.name}</option>
                        })}
                    </select>
                    <select name="move-two" onChange={this.props.updateAttrs}>
                        {pokemon.moves.map(idx => {
                            return <option value={idx.move.name}>{idx.move.name}</option>
                        })}
                    </select>
                    <select name="move-three" onChange={this.props.updateAttrs}>
                        {pokemon.moves.map(idx => {
                            return <option value={idx.move.name}>{idx.move.name}</option>
                        })}
                    </select>
                    <select name="move-four" onChange={this.props.updateAttrs}>
                        {pokemon.moves.map(idx => {
                            return <option value={idx.move.name}>{idx.move.name}</option>
                        })}
                    </select>
                    
                </div>
                <div>
                    <h2>Abilities</h2>
                    {abilities}
                </div>
                <div>
                    <h2>Items</h2>
                    <input type="text" onChange={this.updateSearch}></input>
                    <select name="items" size="6" onChange={this.props.updateAttrs}>
                        {this.props.items.map(item => {
                            if (!this.state.searchQuery || item.name.includes(this.state.searchQuery)) {
                                return <option value={item.name}>{item.name}</option>
                            }
                        })}
                    </select>
                </div>
                
                <div>
                    {pokemon.stats.reverse.forEach(stat => {
                        return <p>{stat.stat.name + ": " + stat.base_stat}</p>
                    })}
                </div>
            </div>
        )
    }
}

export default PokemonAttributes;