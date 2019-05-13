import React from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    POKEMON: 'pokemon',
};

const pokemonSource = {
    // canDrag(props) {
    //     return props.isReady
    // },

    // isDragging(props, monitor){
    //     return monitor.getPokemon().id === props.id
    // },

    beginDrag(props, monitor, component){
        const pokemon = { name: props.name }
        return pokemon;
    },

    endDrag(props, monitor, component) {
        if(!monitor.didDrop()){
            return;
        }

        const pokemon = monitor.getPokemon();
        const dropResult = monitor.getDropResult();

        // PokemonActions.movePokemonToTeam(pokemon.name,)
    }
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
        const { name } = this.props;
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div>
                This is a draggable { name }
                {isDragging && ' (currently being dragged)'}
            </div>
        )
    }
}

export default DragSource(Types.POKEMON, pokemonSource, collect)(Pokemon);