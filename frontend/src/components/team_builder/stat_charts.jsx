import React from 'react'
import * as StatUtil from '../../util/stat_util'
import * as TypeUtil from '../../util/type_util'
import { RadarChart, HorizontalBarSeries, XYPlot, VerticalGridLines, XAxis, YAxis, CircularGridLines} from 'react-vis'
import '../../../node_modules/react-vis/dist/style.css'
import './stat_charts.css'

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
                    newTeam.pokemon.push(mon)
                }
            })
        } else {
            newTeam = this.props.team
        }
        let averages = StatUtil.averageStats(newTeam, this.props.pokemon);
        let defensiveCoverage = TypeUtil.teamDefensiveCoverage(newTeam, this.props.pokemon);
        const defenseData = [];
        if (defensiveCoverage.coverage){
            let coverageValues = defensiveCoverage.coverage;
            TypeUtil.types.forEach(type => {
                defenseData.push({x: coverageValues[type], y: type})
            })
        }
        let moveTypes = TypeUtil.teamMoveClassAnalysis(newTeam, this.props.moves)
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
            { name: 'stat-total', domain: [0, 800] }
        ]
        return(
            <div className='team-stat-container'>
                <div className='stat-averages'>
                    <RadarChart data={statData} domains={statDomains} height={320} width={320} color='white' margin={{left: 40, right: 40, top: 40, bottom: 40}} style={{
                        axes: {
                            line: {strokeWidth: 0.5},
                            ticks: {},
                            text: {}
                        },
                        labels: {
                            fontSize: 12
                        },
                        polygons: {
                            strokeWidth: 1,
                            strokeOpacity: 1,
                            fillOpacity: 0.5
                        }
                    }}
                    animation='noWobble'>
                    </RadarChart>
                </div>
                <div className='defensive-types'>
                    <XYPlot height={400} width={400} margin={{ left: 50, right: 40, top: 40, bottom: 40 }} yType="ordinal" animation="noWobble">
                        <VerticalGridLines/>
                        <HorizontalBarSeries data={defenseData} color='red'/>
                        <XAxis/>
                        <YAxis />
                    </XYPlot>
                </div> 
                {/* <div>
                    <XYPlot height={400} width={400} yType="ordinal">
                        <VerticalGridLines />
                        <HorizontalBarSeries data={defenseData} color='red' />
                        <XAxis />
                        <YAxis />
                    </XYPlot>
                </div> */}

                <div className="move-totals">
                    <div>Physical moves: {moveTypes.physical}</div>
                    <div>Special moves: {moveTypes.special}</div>
                </div>
            </div>
        )
    }
}

export default StatChart;