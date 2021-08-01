import React, { createContext, useContext, useEffect, useState } from "react";
import { Pokemon } from "types/pokemon";

interface PokemonContextType {
    selectedPokemon?: Pokemon;
    ownedPokemon: Pokemon[];
    setSelectedPokemon?: (poke: Pokemon) => void;
    setOwnedPokemon?: (pokes: Pokemon[]) => void;
}

const PokemonContext = createContext<PokemonContextType>({
    ownedPokemon: []
});

export const PokemonProvider = ({children}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [ownedPokemon, setOwnedPokemon] = useState([]);

    // load latest pokemon data
    useEffect(()=>{
        const loadPokemon = () => {
            if(localStorage){
                const savedPokemon = localStorage.getItem("sel_poke");
                setSelectedPokemon(savedPokemon? JSON.parse(savedPokemon) : null);
                const savedOwned = localStorage.getItem("own_poke");
                setOwnedPokemon(savedOwned? JSON.parse(savedOwned) : []);
            }
        }
        loadPokemon();
    },[])
    
    // save updated selected pokemon
    useEffect(()=>{
        if(localStorage){
            localStorage.setItem("sel_poke", JSON.stringify(selectedPokemon))
        }
    },[selectedPokemon])

    // save updated owned pokemon
    useEffect(()=>{
        if(localStorage){
            localStorage.setItem("own_poke", JSON.stringify(ownedPokemon))
        }
    },[ownedPokemon])

    const value = {selectedPokemon, setSelectedPokemon, ownedPokemon, setOwnedPokemon}
    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    return context;
}