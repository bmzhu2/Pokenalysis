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
        
        this.state = {
            isHovered: false,
        };

    }

    componentDidUpdate(prevProps){
        if (!prevProps.isOver && this.props.isOver) {
            this.setState({ isHovered: true });
        }

        if (prevProps.isOver && !this.props.isOver) {
            this.setState({ isHovered: false });
        }
    }

    render(){
        const { id, pokeId, name, sprite, removeFromTeam, scrollY, isDragging } = this.props;
        const { canDrop, connectDropTarget, setAttrId } = this.props;
        const { isHovered } = this.state;

        const teamSlotClass = scrollY && isHovered ?
            "team-slot hovered-slot minimized" :
            scrollY && !isHovered && isDragging ? "team-slot minimized is-dragging-slot" :
            scrollY && !isHovered ? "team-slot minimized" :
            isHovered ? "team-slot hovered-slot" : isDragging ? "team-slot is-dragging-slot" : "team-slot";

        return connectDropTarget(
            <li className={scrollY ? "team-slot-o-container min-container" : "team-slot-o-container"}>
                <p onClick={() => removeFromTeam(id)} className={sprite && scrollY ? "x min-x" : sprite ? "x" : "none"}>x</p> 
                <div className={teamSlotClass}>
                    <p className={sprite ? "none" : scrollY ? "plus minimized-plus" : "plus"}>+</p>
                    <img onClick={setAttrId} className={sprite ? "team-slot-sprite" : ""} src={sprite} alt=""/>
                </div>
                <div className="team-slot-header"> 
                    <h3 className="team-slot-name">{name}</h3>
                </div>
            </li>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


