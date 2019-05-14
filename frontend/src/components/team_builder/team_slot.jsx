import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import './team_slot.css';

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
                <p className={sprite ? "none" : "plus"}>+</p> 
                <p onClick={this.removeFromTeam} className={sprite ? "x" : "none"}>x</p> 
                <h3 className="team-slot-name">{name}</h3>
                <img className={sprite ? "team-slot-sprite" : ""} src={sprite} alt=""/>
            </li>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


