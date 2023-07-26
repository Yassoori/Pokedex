import {createContext, useState} from 'react'

export const PokeContext = createContext();

export const PokeContextProvider = ({children}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    return (
        <PokeContext.Provider value={{selectedPokemon, setSelectedPokemon}}>
            {children}
        </PokeContext.Provider>
    )
}