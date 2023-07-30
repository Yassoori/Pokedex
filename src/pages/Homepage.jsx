import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Rings } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { PokeContext } from '../context/PokeContext'
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    const [searchTerm, setSearchTerm] = useState('')
    const [type, setType] = useState('')
    // const [Ndex, setNdex] = useState('')
    // set state for all pokemon
    const [pokemon, setPokemon] = useState([])
    // set state for loading
    const [loading, setLoading] = useState(true)
    // // define useNavigate
    const navigate = useNavigate()
    // set state for filter
    const [filteredPokemon, setFilteredPokemon] = useState([]);


    // useEffect - API call inside
    useEffect(() => {
        AOS.init();
        const fetchPokemon = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    // original 151
                    `https://pokeapi.co/api/v2/pokemon?limit=151/`

                    // Gen IV
                    // `https://pokeapi.co/api/v2/pokemon?limit=493/`
                    // All current
                    // `https://pokeapi.co/api/v2/pokemon?limit=1010/`

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
                            name: pokemon.name,
                            id: pokeResponse.data.id,
                            art: pokeResponse.data.sprites.other['official-artwork'].front_default,
                            sprite: pokeResponse.data.sprites.front_default,
                            type1: type[0],
                            type2: type[1],
                            types: type,
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
                setFilteredPokemon(pokemons)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemon()

    }, [])

    useEffect(() => {
        AOS.init();
        const fetchPokemon = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    // Original 151
                    `https://pokeapi.co/api/v2/pokemon?limit=151/`

                    // up to Gen IV
                    // `https://pokeapi.co/api/v2/pokemon?limit=493/`
                    // All current
                    // `https://pokeapi.co/api/v2/pokemon?limit=1010/`

                );

                const pokeData = response.data.results;
                
                // get details for pokedex entries
                const pokeDetails = await Promise.all(
                    pokeData.map(async (pokemon) => {
                        const pokeResponse = await axios.get(pokemon.url)
                        const type = pokeResponse.data.types.map(
                            (typeData) => typeData.type.name
                            );
                        // const sprite = pokeResponse.data.sprites.front_default;
                        // const art = pokeResponse.data.sprites.other['official-artwork'].front_default;
                        // const pokeid = pokeResponse.data.id;

                        return {
                            name: pokemon.name,
                            id: pokeResponse.data.id,
                            art: pokeResponse.data.sprites.other['official-artwork'].front_default,
                            sprite: pokeResponse.data.sprites.front_default,
                            type1: type[0],
                            type2: type[1],
                            types: type,
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
                setLoading(false)
                setPokemon(pokemons);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemon()

        // Filter pokedexes based on searchTerm and type
        const filteredData = pokemon.filter((pokemon) => {
            // Filter based on the name and type
            const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()); 
            const typeMatch = !type || pokemon.types.includes(type.toLowerCase());
            return nameMatch && typeMatch;
        });

        // Set the filtered data to the state
        setFilteredPokemon(filteredData);

    }, [type])

  return (
    <div>
        <div className="type-filter">
            <button onClick={(e) => setType(e.target.value)} className='type-pill , normal' value='normal'>Normal</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , fighting' value='fighting'>Fighting</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , flying' value='flying'>Flying</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , fire' value='fire'>Fire</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , water' value='water'>Water</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , grass' value='grass'>Grass</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , electric' value='electric'>Electric</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , ice' value='ice'>Ice</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , bug' value='bug'>Bug</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , poison' value='poison'>Poison</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , ground' value='ground'>Ground</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , rock' value='rock'>Rock</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , steel' value='steel'>Steel</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , dragon' value='dragon'>Dragon</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , ghost' value='ghost'>Ghost</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , psychic' value='psychic'>Psychic</button>
            <button onClick={(e) => setType(e.target.value)} className='type-pill , fairy' value='fairy'>Fairy</button>
            {/* none of the original 151 are dark type */}
            {/* <button onClick={(e) => setType(e.target.value)} className='type-pill , dark' value='dark'>Dark</button> */}
            {/* Clear */}
            <button onClick={(e) => setType(e.target.value)} className='type-pill , clear' value=''>Clear</button>
            <div id="search-container">
                <input type='text' id='search-input' name='search' placeholder='Search' onChange={(e) => {
                    setSearchTerm(e.target.value)
                    console.log(searchTerm);
                    }} value={searchTerm}/>
            </div>
        </div>

        {/* <div className="gen-filter">
            <button onClick={(e) => setGen(e.target.value)} className='type-pill , gen-i' value='1'>Gen I</button>
            <button onClick={(e) => setGen(e.target.value)} className='type-pill , gen-ii' value='2'>Gen II</button>
            <button onClick={(e) => setGen(e.target.value)} className='type-pill , gen-iii' value='3'>Gen III</button>
            <button onClick={(e) => setGen(e.target.value)} className='type-pill , gen-iv' value='4'>Gen IV</button>
        </div> */}
        
        {/* <h1>Pokedex</h1> */}
        <div id='pokedex-container'>
            {loading ? (
                <Rings color="#e53131" height={100} width={100} position="absolute" top="30%"/>
            ) : pokemon.length === 0 ? (<p>No Pokemon Found</p>) : 
            (
                filteredPokemon.map((item) => (
                    <div className='pokedex-entry' key={item.name} data-aos='zoom-in-up' data-aos-offset='100'>
                        <p className='dex-number'>National Pokédex #{item.id}</p>
                        <h2 className="name">{item.name}</h2>
                        <img className='pokedex-entry-image' src={item.art} alt={item.name} />
                        {/* alternative sprites */}
                        {/* <img className='pokedex-entry-image' src={item.sprite} alt={item.name} /> */}
                        <div className='type-container'>
                            <p className='poke-type , type-pill'  style={{backgroundColor: typeColors[item.type1]}} >{item.type1}</p>
                            <p className='poke-type , type-pill'  style={{backgroundColor: typeColors[item.type2]}} >{item.type2}</p>
                        </div>
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