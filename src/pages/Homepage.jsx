import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { PokeContext } from '../context/PokeContext'

const typeColors = {
    normal: '#B8B08D',
    fire: '#EACFB7',
    water: '#A0C1D1',
    grass: '#9EBF8F',
    electric: '#F2E77A',
    ice: '#A1D2D0',
    fighting: '#B63D3A',
    poison: '#B06DAB',
    ground: '#D6C689',
    flying: '#B69FEC',
    psychic: '#E2868B',
    bug: '#A7BD5B',
    rock: '#BDAF6E',
    ghost: '#8D7B9C',
    dragon: '#8574F8',
    dark: '#8D7B6F',
    steel: '#B9B9CC',
    fairy: '#E3AFC3',
  };

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
                );

                const pokeData = response.data.results;

                // get details for pokedex entries
                const pokeDetails = await Promise.all(
                    pokeData.map(async (pokemon) => {
                        const pokeResponse = await axios.get(pokemon.url)
                        const type = pokeResponse.data.types.map(
                            (typeData) => typeData.type.name
                            );
                        const sprite = pokeResponse.data.sprites.front_default;
                        // const art = pokeResponse.data.sprites.other['official-artwork'].front_default;
                        const pokeid = pokeResponse.data.id;

                        return {
                            // name: pokemon.name,
                            id: pokeResponse.data.id,
                            art: pokeResponse.data.sprites.other['official-artwork'].front_default,
                            types: type,
                            // ability: ability,
                        };
                    })
                )

                const pokemons = response.data.results.map((pokemon) => {
                    return {
                        ...pokemon,
                        onSelect: () => setSelectedPokemon(pokemon)
                    }
                })

                console.log(response.data.results)

                setPokemon(pokemons)
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemon()
    }, [])

  return (
    <div>
        <div className="type-filter">
            <button className='type-pill , normal'>Normal</button>
            <button className='type-pill , fighting'>Fighting</button>
            <button className='type-pill , flying'>Flying</button>
            <button className='type-pill , poison'>Poison</button>
            <button className='type-pill , fire'>Fire</button>
            <button className='type-pill , water'>Water</button>
            <button className='type-pill , grass'>Grass</button>
            <button className='type-pill , electric'>Electric</button>
            <button className='type-pill , psychic'>Psychic</button>
            <button className='type-pill , ice'>Ice</button>
            <button className='type-pill , ground'>Ground</button>
            <button className='type-pill , rock'>Rock</button>
            <button className='type-pill , bug'>Bug</button>
            <button className='type-pill , dragon'>Dragon</button>
            <button className='type-pill , ghost'>Ghost</button>
            <button className='type-pill , dark'>Dark</button>
            <button className='type-pill , steel'>Steel</button>
            <button className='type-pill , fairy'>Fairy</button>
        </div>
        
        {/* <h1>Pokedex</h1> */}
        <div id='pokedex-container'>
            {loading ? (
                <Puff color="#e53131" height={100} width={100}/>
            ) : pokemon.length === 0 ? (<p>No Pokemon Found</p>) : 
            (
               pokemon.map((item) => (
                    <div className='pokedex-entry' key={item.name}>
                        <h2 className="name">{item.name}</h2>
                        <img src="" alt="" />

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