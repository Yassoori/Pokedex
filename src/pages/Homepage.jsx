import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { PokeContext } from '../context/PokeContext'

const Homepage = () => {
    // set pokecontext
    const {setSelectedPokemon} = useContext(PokeContext)
    // useState definitions for inputs:
    const [type, setType] = useState('')
    const [searchName, setSearchName] = useState('')
    const [Ndex, setNdex] = useState('')
    // set state for all pokemon
    const [pokemon, setPokemon] = useState([])
    // set state for loading
    const [loading, setLoading] = useState(true)
    // // define useNavigate
    const navigate = useNavigate()

    // useEffect - API call inside
    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=151/`
                )
                const pokemons = response.data.results.map((pokemon) => {
                    return {
                        ...pokemon,
                        onSelect: () => setSelectedPokemon(pokemon)
                    }
                })
                console.log(response.data.results)
                setPokemon(pokemons)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemon()
    }, [])

  return (
    <div>
        <div>
            <h1>Pokedex</h1>
            {loading ? (
                <Puff color="#00BFFF" height={100} width={100}/>
            ) : pokemon.length === 0 ? (<p>No Pokemon Found</p>) : 
            (
               pokemon.map((item) => (
                    <div className='pokedex-entry' key={item.name}>
                        <h2 className="name">{item.name}</h2>
                        <button onClick={() => {
                            item.onSelect()
                            navigate('/pokemon/')
                            }
                        } className='read-more'>Read More</button>
                    </div>   
               ))
            )}
        </div>
    </div>
  )
}

export default Homepage