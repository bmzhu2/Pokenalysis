import React from 'react';
import './filter.css';
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
                <li key={type} id={type} className="filter-item" onClick={() => handleTypeFilter(name, type)}>
                    <h3>{type}</h3>
                </li>
            )
        });
        return(
            <div className="filter-buttons-container">
                <h2>{name}</h2>
                <ul className="filter-list">
                    {filterTypes}
                </ul>
            </div>
        )
    }
}

export default Filter;