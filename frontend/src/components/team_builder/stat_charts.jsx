import React from 'react';
import * as StatUtil from '../../util/stat_util';
import * as TypeUtil from '../../util/type_util';
import { RadarChart, HorizontalBarSeries, XYPlot, VerticalGridLines, XAxis, YAxis, CircularGridLines} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import './stat_charts.css';

class StatChart extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { showStats, defensiveChart, handleCoverageType } = this.props;
        let newTeam = {};
        if(!this.props.team.pokemon){
            newTeam.pokemon = [];
            Object.values(this.props.team).forEach(mon => {
                if(mon.pokeId){
                    newTeam.pokemon.push(mon);
                }
            });
        } else {
            newTeam = this.props.team;
        }
        let averages = StatUtil.averageStats(newTeam, this.props.pokemon);
        let defensiveCoverage = TypeUtil.teamDefensiveCoverage(newTeam, this.props.pokemon);
        let offensiveCoverage  = TypeUtil.teamOffensiveCoverage(newTeam, this.props.moves, this.props.pokemon)
        const defenseData = [];
        if (defensiveCoverage.coverage){
            let coverageValues = defensiveCoverage.coverage;
            TypeUtil.types.forEach(type => {
                defenseData.push({x: coverageValues[type], y: type});
            });
        }
        const offenseData = [];
        if (offensiveCoverage) {
            TypeUtil.types.forEach(type => {
                if(offensiveCoverage[type] !== undefined){
                    offenseData.push({ x: offensiveCoverage[type], y: type });
                } else{
                    offenseData.push({ x: 0, y: type });
                }
            });
        }
        let moveTypes = TypeUtil.teamMoveClassAnalysis(newTeam, this.props.moves);
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
            { name: 'speed', domain: [0, 200] },
            { name: 'attack', domain: [0, 200] },
            { name: 'special-attack', domain: [0, 200] },
            { name: 'special-defense', domain: [0, 200] },
            { name: 'defense', domain: [0, 200] },
            { name: 'hp', domain: [0, 200] },
            { name: 'stat-total', domain: [0, 800] }
        ];
        
        const oHeight = defensiveChart ? 0 : window.innerHeight * 0.55;
        const oWidth = defensiveChart ? 0 : window.innerHeight * 0.65;
        const dHeight = !defensiveChart ? 0 : window.innerHeight * 0.55;
        const dWidth = !defensiveChart ? 0 : window.innerHeight * 0.65;

        return(
        <div className="team-stat-container-container">
            <div className={showStats ? 'team-stat-container' : 'team-stat-container hidden-stats'}>
                <h1>Team Stats</h1>
                <div className="stat-averages-container">
                    <div className='stat-averages'>
                        <h1>Stat Averages</h1>
                        <div className="radar-container">
                            <RadarChart data={statData} domains={statDomains} height={window.innerHeight * 0.5} width={window.innerHeight * 0.5} color='white' margin={{left: 40, right: 40, top: 30, bottom: 40}} style={{
                                axes: {
                                    line: {strokeWidth: 0.5},
                                    ticks: {},
                                    text: {}
                                },
                                labels: {
                                    fontSize: 12,
                                    fontFamily: 'Montserrat, sans-serif'
                                },
                                polygons: {
                                    strokeWidth: 1,
                                    strokeOpacity: 1,
                                    fillOpacity: 0.5
                                }
                            }}
                            animation={false}>
                            </RadarChart>
                        </div>
                    </div>
                    <div className="coverage-chart-container">
                        <div className="chart-header-container">
                            <h1 className={defensiveChart ? "chart-header selected-chart-header" : "chart-header"} 
                                onClick={() => handleCoverageType(true)}
                                >Defensive Coverage
                            </h1>
                                <h1 className={defensiveChart ? "chart-header" : "chart-header selected-chart-header"} 
                                onClick={() => handleCoverageType(false)}
                                >Offensive Coverage
                            </h1>
                        </div>
                        <div className={'defensive-types'}>
                            <XYPlot height={oHeight} width={oWidth} 
                                margin={{ left: 50, right: 40, top: 20, bottom: 40 }} 
                                yType="ordinal" animation="noWobble">
                                <VerticalGridLines/>
                                <HorizontalBarSeries data={defenseData} color='red'/>
                                <XAxis style={{ text: { fill: 'black', fontFamily: 'Montserrat, sans-serif' } }}/>
                                <YAxis style={{ text: { fill: 'black', fontFamily: 'Montserrat, sans-serif'}}}/>
                            </XYPlot>
                        </div> 
                        <div className='offensive-coverage'>
                            <XYPlot height={dHeight} width={dWidth} 
                                margin={{ left: 50, right: 40, top: 20, bottom: 40 }} yType="ordinal" animation="noWobble">
                                <VerticalGridLines />
                                <HorizontalBarSeries data={offenseData} color='red' />
                                <XAxis style={{ text: { fill: 'black', fontFamily: 'Montserrat, sans-serif' } }}/>
                                <YAxis style={{ text: { fill: 'black', fontFamily: 'Montserrat, sans-serif' } }}/>
                            </XYPlot>
                        </div>

                        <div className="move-totals">
                            <div>Physical moves: {moveTypes.physical}</div>
                            <div>Special moves: {moveTypes.special}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default StatChart;