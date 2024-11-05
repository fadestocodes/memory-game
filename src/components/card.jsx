import { useEffect, useState } from "react";
import '../styles/card.css'




function Cards( {masterPokemonList, shuffleList} ){

   
    
    return (
        <div className="all-cards-container">
            { masterPokemonList.nameList.map( element => (
             
                    <div key={ element.id } className="card-container" onClick={()=>shuffleList(element.name)}>
                        <img src={element.sprites.front_default} />
                        <h3>{element.name}</h3>
                    </div>
                
            ))}
        </div>
    )
}

export {Cards}