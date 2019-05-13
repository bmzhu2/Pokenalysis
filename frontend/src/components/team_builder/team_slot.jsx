import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const Types = {
    POKEMON: 'pokemon',
};

const TeamSlotTarget = {
    drop(props, monitor, component){
        const pokemon = monitor.getItem();
        props.onDrop(pokemon);
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
            <div>This is a 
                { this.props.team[0] }
            </div>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


