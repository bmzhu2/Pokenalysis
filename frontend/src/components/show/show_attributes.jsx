import React from 'react'
import './show_attributes.css'

const ShowAttributes = (props) => {
    if(props.pokemon){

        return (
          <div className="poke-attrs">
            <div className="attr-header">
              <h1>{props.pokemon.name}</h1>
            </div>
            <div className="attr-col-section">
              <div className="attr-col">
                <h3>Move List</h3>
                <ul>
                  <li>{props.pokemon.move1.split("-").join(" ")}</li>
                  <li>{props.pokemon.move2.split("-").join(" ")}</li>
                  <li>{props.pokemon.move3.split("-").join(" ")}</li>
                  <li>{props.pokemon.move4.split("-").join(" ")}</li>
                </ul>
              </div>
              <div className="attr-col">
                <h3>Ability</h3>
                <div>{props.pokemon.ability.split("-").join(" ")}</div>
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