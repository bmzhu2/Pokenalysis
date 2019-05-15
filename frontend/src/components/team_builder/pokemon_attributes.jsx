import React from 'react';
import './pokemon_attributes.css'

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
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }

    setItem(e) {
        let attrs = this.props.team[this.props.slot];
        attrs.item = e.currentTarget.value;
        this.props.updatePokeAttrs(this.props.slot, attrs)
    }

    updateSearch(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.slot !== prevProps.slot) {
            this.setState({
                searchQuery: ""
            })
        }
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
            return (
              <option value={ability.ability.name}>
                {ability.ability.name.split("-").join(" ")}
              </option>
            );
        })

        let itemsList = 
            Object.keys(this.props.items).map(item => {
                if (!this.state.searchQuery || item.includes(this.state.searchQuery)) {
                    return <option value={item}>{item.split('-').join(" ")}</option>
                }
            }) 


        let stats = pokemon.stats.reverse()
        stats = stats.map(stat => {
                return <div>{`${stat.stat.name.split('-').join(" ")}: ${stat.base_stat}`}</div>
            })

        let sortedMoves = pokemon.moves.sort();

        return (
          <div className="poke-attrs">
            <div className="attr-header">
              <h1>{pokemon.name}</h1>
              {pokemon.types.join(" ")}
            </div>
            <div className="attr-col-section">
              <div className="attr-col">
                <h3>Moves</h3>
                <select
                  name="move-one"
                  value={pokeAttrs.move1}
                  onChange={this.setMove1}
                >
                  <option>
                    Select a move
                  </option>
                  {sortedMoves.map(move => {
                    return (
                      <option value={move}>
                        {move.split("-").join(" ")}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="move-two"
                  value={pokeAttrs.move2}
                  onChange={this.setMove2}
                >
                  <option>
                    Select a move
                  </option>
                  {sortedMoves.map(move => {
                    return (
                      <option value={move}>
                        {move.split("-").join(" ")}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="move-three"
                  value={pokeAttrs.move3}
                  onChange={this.setMove3}
                >
                  <option>
                    Select a move
                  </option>
                  {sortedMoves.map(move => {
                    return (
                      <option value={move}>
                        {move.split("-").join(" ")}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="move-four"
                  value={pokeAttrs.move4}
                  onChange={this.setMove4}
                >
                  <option>
                    Select a move
                  </option>
                  {sortedMoves.map(move => {
                    return (
                      <option value={move}>
                        {move.split("-").join(" ")}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="attr-col">
                <h3>Abilities</h3>
                <select
                  name="abilities"
                  size="3"
                  value={pokeAttrs.ability}
                  onChange={this.setAbility}
                >
                  {abilities}
                </select>
              </div>
              <div className="attr-col">
                <h3>Items</h3>
                <input
                  type="text"
                  value={this.state.searchQuery}
                  onChange={this.updateSearch}
                />
                <select
                  name="items"
                  size="6"
                  value={pokeAttrs.item}
                  onChange={this.setItem}
                >
                  <option value="">None</option>
                  {itemsList}
                </select>
              </div>
              <div className="attr-col">
                <h3>Stats</h3>
                <div className="attr-stats">
                    {stats}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default PokemonAttributes;