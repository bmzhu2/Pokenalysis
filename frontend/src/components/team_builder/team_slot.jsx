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
        const { id, pokeId, name, sprite, removeFromTeam, scrollY } = this.props;
        const { canDrop, connectDropTarget, setAttrId } = this.props;
        const { isHovered } = this.state;
        return connectDropTarget(
            <li onClick={setAttrId} className="team-slot-o-container">
                <p onClick={() => removeFromTeam(id)} className={sprite ? "x" : "none"}>x</p> 
                <div className={scrollY && isHovered ? 
                    "team-slot hovered-slot minimized" : 
                    scrollY && !isHovered ? "team-slot minimized" : 
                    isHovered ? "team-slot hovered-slot" : "team-slot"}>
                    <p className={sprite ? "none" : "plus"}>+</p>
                    <img className={sprite ? "team-slot-sprite" : ""} src={sprite} alt=""/>
                </div>
                <div className="team-slot-header"> 
                    <h3 className="team-slot-name">{name}</h3>
                </div>
            </li>
        )
    }
}

export default DropTarget(Types.POKEMON, TeamSlotTarget, collect)(TeamSlot);


