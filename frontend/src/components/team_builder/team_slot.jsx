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
        item: monitor.getItem(),
    });
}

class TeamSlot extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { name, sprite } = this.props;
        const { isOver, canDrop, connectDropTarget, item } = this.props;
        return connectDropTarget(
            <li className="team-slot"> 
                +
                <h3>{name}</h3>
                <img src={sprite} alt=""/>
            </li>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


