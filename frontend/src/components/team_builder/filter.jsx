import React from 'react';
import './filter.css';
const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
    'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

class Filter extends React.Component {
    render(){
        const { handleTypeFilter, name, typeFilter, isOpen, isAnimating, handleAnimationEnd } = this.props;
        const filterTypes = types.map(type => {
            return (
                <li key={type} 
                    className={(typeFilter === type) ? "filter-item-container selected" : "filter-item-container"} 
                    onClick={() => handleTypeFilter(name, type)}>
                    <h3>{type}</h3>
                    <div className="filter-item" id={type}></div>
                </li>
            )
        });
        return(
            <div
                onAnimationEnd={handleAnimationEnd} 
                className={isOpen && isAnimating ? 
                "filter-buttons-container open swipe-down" : 
                isOpen && !isAnimating ? 
                "filter-buttons-container open" :
                "filter-buttons-container"}>
                <ul className="filter-list">
                    {filterTypes}
                </ul>
            </div>
        )
    }
}

export default Filter;