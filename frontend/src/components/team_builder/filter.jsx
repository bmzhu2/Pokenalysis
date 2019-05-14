import React from 'react';

const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
    'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

class Filter extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const { filterByType, handleTypeFilter, name } = this.props;
        const filterTypes = types.map(type => {
            return (
                <li key={type} onClick={() => handleTypeFilter(name, type)}>
                    <h3>{type}</h3>
                </li>
            )
        });
        return(
            <div>
                <h2>{name}</h2>
                <ul>
                    {filterTypes}
                </ul>
            </div>
        )
    }
}

export default Filter;