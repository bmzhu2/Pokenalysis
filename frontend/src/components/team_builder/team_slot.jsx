import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const Types = {
    POKEMON: 'pokemon',
};

const TeamSlotTarget = {
    // canDrop(props, monitor) {
    //     const pokemon = monitor.getPokemon();
    //     return console.log("pokemon is dropped");
    // },

    drop(props, monitor, component){
        if (monitor.didDrop()){
            return;
        }

        const pokemon = monitor.getPokemon();
        console.log(pokemon.name);
        props.onDrop
    }
};

function collect(connect, monitor){
    return  ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    });
}

class TeamSlot extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { name } = this.props;
        const { isOver, canDrop, connectDropTarget } = this.props;
        
        return connectDropTarget(
            <div>This is a slot that a pokemon may be dragged to
                { this.props.name };
            </div>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


