import React from 'react'
import './show_attributes.css'

const ShowAttributes = (props) => {
    if(props.pokemon){

        const move1 = props.pokemon.move1 ? props.pokemon.move1 : "none"
        const move2 = props.pokemon.move2 ? props.pokemon.move2 : "none"
        const move3 = props.pokemon.move3 ? props.pokemon.move3 : "none"
        const move4 = props.pokemon.move4 ? props.pokemon.move4 : "none"
        const ability = props.pokemon.ability ? props.pokemon.ability : "none"

        return (
          <div className="poke-attrs">
            <div className="attr-header">
              <h1>{props.pokemon.name}</h1>
            </div>
            <div className="attr-col-section">
              <div className="attr-col">
                <h3>Move List</h3>
                <ul>
                  <li>{move1.split("-").join(" ")}</li>
                  <li>{move2.split("-").join(" ")}</li>
                  <li>{move3.split("-").join(" ")}</li>
                  <li>{move4.split("-").join(" ")}</li>
                </ul>
              </div>
              <div className="attr-col">
                <h3>Ability</h3>
                <div>{ability.split("-").join(" ")}</div>
              </div>
              <div className="attr-col">
                <h3>Nature</h3>
                <div>{props.pokemon.nature}</div>
              </div>
              <div className="attr-col">
                <h3>Item</h3>
                <div>
                  {props.pokemon.item
                    ? props.pokemon.item.split("-").join(" ")
                    : "none"}
                </div>
              </div>
            </div>
          </div>
        );
    } else{
        return null
    }
}

export default ShowAttributes