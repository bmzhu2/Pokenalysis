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

    componentDidMount(){
  
    }

    render() {
        const { name, sprite } = this.props;
        const { isDragging, connectDragSource } = this.props;
        return connectDragSource(
            <li className="pokemon-container">
                <h3 className="pokemon-sprite-name">{name}</h3>
                <img className="pokemon-index-sprite" src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/13144987/jbareham_180922_0802_pokeball.png" data-lazy={sprite} alt="pokeball"/>
            </li>
        )
    }
}

export default DragSource(Types.POKEMON, pokemonSource, collect)(Pokemon);