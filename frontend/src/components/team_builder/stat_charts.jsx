import React from 'react'
import * as StatUtil from '../../util/stat_util'
import * as TypeUtil from '../../util/type_util'
import { RadarChart, HorizontalBarSeries } from 'react-vis'

class StatChart extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let newTeam = {}
        if(!this.props.team.pokemon){
            newTeam.pokemon = []
            Object.values(this.props.team).forEach(mon => {
                if(mon.pokeId){
                    newTeam.pokemon.push({pokeId: mon.pokeId})
                }
            })
        } else {
            newTeam = this.props.team
        }
        let averages = StatUtil.averageStats(newTeam, this.props.pokemon)
        const statData = [{
            'speed': averages['speed'],
            'attack': averages['attack'],
            'special-attack': averages['special-attack'],
            'defense': averages['defense'],
            'special-defense': averages['special-defense'],
            'hp': averages['hp'],
            'stat-total': averages['stat-total']
        }];
        const statDomains = [
            {name: 'speed', domain: [0, 200]},
            { name: 'attack', domain: [0, 200] },
            { name: 'special-attack', domain: [0, 200] },
            { name: 'special-defense', domain: [0, 200] },
            { name: 'defense', domain: [0, 200] },
            { name: 'hp', domain: [0, 200] },
            { name: 'stat-total', domain: [0, 700] }
        ]
        return(
            <div className='team-stat-container'>
                <div className='stat-averages'>
                    <RadarChart data={statData} domains={statDomains} height={200} width={200}/>
                </div>
                <div className='defensive-types'>
                    
                </div> 
            </div>
        )
    }
}

export default StatChart;