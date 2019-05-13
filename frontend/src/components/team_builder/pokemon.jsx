import React from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    POKEMON: 'pokemon',
};

const pokemonSource = {
    beginDrag(props, monitor, component){
        const pokemon = { name: props.name };
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
        const { name } = this.props;
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div>
                This is a draggable { name }
            </div>
        )
    }
}

export default DragSource(Types.POKEMON, pokemonSource, collect)(Pokemon);