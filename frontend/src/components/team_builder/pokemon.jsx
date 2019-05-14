import React from 'react';
import { DragSource } from 'react-dnd';
import './pokemon.css';
const Types = {
    POKEMON: 'pokemon',
};

const pokemonSource = {
    beginDrag(props, monitor, component){
        const pokemon = { name: props.name, sprite: props.sprite };
        return pokemon;
    },

};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        // isDragging: monitor.isDragging(),
    };
};

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { name, sprite } = this.props;
        const { isDragging, connectDragSource } = this.props;
        return connectDragSource(
            <li className="pokemon-container">
                <h3>{name}</h3>
                <img src={sprite} alt=""/>
            </li>
        )
    }
}

export default DragSource(Types.POKEMON, pokemonSource, collect)(Pokemon);