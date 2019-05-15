import React from 'react'

const ShowAttributes = (props) => {
    if(props.pokemon){

        return(
            <div>
                <h3>Move List</h3>
                <ul>
                    <li>{props.pokemon.move1.split('-').join(' ')}</li>
                    <li>{props.pokemon.move2.split('-').join(' ')}</li>
                    <li>{props.pokemon.move3.split('-').join(' ')}</li>
                    <li>{props.pokemon.move4.split('-').join(' ')}</li>
                </ul>
                <h3>Ability</h3>
                <div>{props.pokemon.ability.split('-').join(' ')}</div>
                <h3>Nature</h3>
                <div>{props.pokemon.nature}</div>
                <h3>Item</h3>
                <div>{props.pokemon.item ? props.pokemon.item.split('-').join(' ') : "none"}</div>
            </div>
        )
    } else{
        return null
    }
}

export default ShowAttributes