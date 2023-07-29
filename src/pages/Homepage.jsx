import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { PokeContext } from '../context/PokeContext'

const typeColors = {
    normal: '#a8a878',
    fire: '#f08030',
    water: '#6790f0',
    grass: '#78c850',
    electric: '#f8d031',
    ice: '#98d8d8',
    fighting: '#c03128',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#b69fec',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#ee99ac',
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
                    `https://pokeapi.co/api/v2/pokemon?limit=493/`
                );

                const pokeData = response.data.results;
                
                // I stole this from Alice, and it still doesnt work?!?!?!?!
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
                            name: pokemon.name,
                            id: pokeResponse.data.id,
                            art: pokeResponse.data.sprites.other['official-artwork'].front_default,
                            type1: type[0],
                            type2: type[1],
                            url: pokemon.url
                            // ability: ability,
                        };
                    })
                );

                const pokemons = pokeDetails.map((pokemon) => {
                    return {
                        ...pokemon,
                        onSelect: () => setSelectedPokemon(pokemon)
                    }
                });

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
            <button className='type-pill , normal' value='normal'>Normal</button>
            <button className='type-pill , fighting' value='fighting'>Fighting</button>
            <button className='type-pill , flying' value='flying'>Flying</button>
            <button className='type-pill , poison' value='poison'>Poison</button>
            <button className='type-pill , fire' value='fire'>Fire</button>
            <button className='type-pill , water' value='water'>Water</button>
            <button className='type-pill , grass' value='grass'>Grass</button>
            <button className='type-pill , electric' value='electric'>Electric</button>
            <button className='type-pill , psychic' value='psychic'>Psychic</button>
            <button className='type-pill , ice' value='ice'>Ice</button>
            <button className='type-pill , ground' value='ground'>Ground</button>
            <button className='type-pill , rock' value='rock'>Rock</button>
            <button className='type-pill , bug' value='bug'>Bug</button>
            <button className='type-pill , dragon' value='dragon'>Dragon</button>
            <button className='type-pill , ghost' value='ghost'>Ghost</button>
            <button className='type-pill , dark' value='dark'>Dark</button>
            <button className='type-pill , steel' value='steel'>Steel</button>
            <button className='type-pill , fairy' value='fairy'>Fairy</button>
        </div>
        
        {/* <h1>Pokedex</h1> */}
        <div id='pokedex-container'>
            {loading ? (
                <Puff color="#e53131" height={100} width={100}/>
            ) : pokemon.length === 0 ? (<p>No Pokemon Found</p>) : 
            (
               pokemon.map((item) => (
                    <div className='pokedex-entry' key={item.name} >
                        <p className='dex-number'>National Pokédex #{item.id}</p>
                        <h2 className="name">{item.name}</h2>
                        <img className='pokedex-entry-image' src={item.art} alt={item.name} />
                        <div className='type-container'>
                            <p className='poke-type , type-pill'  style={{backgroundColor: typeColors[item.type1]}} >{item.type1}</p>
                            <p className='poke-type , type-pill'  style={{backgroundColor: typeColors[item.type2]}} >{item.type2}</p>
                        </div>

                        {/* {item.types.map((type)=> (
                        <p>{type.type.name}</p>
                        ))} */}

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