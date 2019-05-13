import React from 'react';
import TeamSlot from './team_slot';
import Pokemon from './pokemon';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TeamBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            team: [],
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(incomingState){
        const { name } = incomingState;
        const newState = this.state.team.concat([name]);
        this.setState({
            team: newState
        });
    }

    render(){
        return(
            <div>
            <div>
                This is a sidebar
                <ul> 
                    <TeamSlot onDrop={this.onDrop} team={this.state.team}/>
                </ul>
                <ul>
                    <li>this is a team component</li>
                </ul>
            </div>
            <div>
                <div>This is the main wrapper for the team
                    <ul>
                        <li>this is a team_member '+' bucket</li>
                    </ul>
                </div>
                <div>Additional team info that will only be visible when selected</div>
                <div>
                    <div>SEARCH</div>
                    <div>filter 1</div>
                    <div>filter 2</div>
                    <div>filter 3</div>
                </div>
                <div>
                    <ul>
                        <Pokemon name="pokemon_name"/>
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(TeamBuilder);