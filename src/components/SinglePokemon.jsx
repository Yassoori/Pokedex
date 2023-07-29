import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'
import { Rings } from 'react-loader-spinner'
import axios from 'axios'

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

const SinglePokemon = () => {
    const {selectedPokemon} = useContext(PokeContext)
    const navigate = useNavigate()
    const [thisPokemon, setThisPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchPokeData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `${selectedPokemon.url}`,
                )
                console.log(response.data);
                setThisPokemon(response.data)
                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        }
        fetchPokeData()
    }, [])

    if (loading){
        return <Rings color="#e53131" height={100} width={100} position="absolute" top="30%"/>
    }
  return (
    <div className='pokedetails'>
        <h2>{selectedPokemon.name}</h2>
        {/* <img src={thisPokemon.sprites.front_default} alt="" /> */}
        <img className='pokedetails-image' src={thisPokemon.sprites.other['official-artwork'].front_default} alt={selectedPokemon.name}/>
        <div className='type-container'>
                {thisPokemon.types.map((type)=> (
                    <p className='type-pill' style={{backgroundColor: typeColors[type.type.name]}}>
                        {type.type.name}
                    </p>
                ))}
        </div>
        <div className='pokedetails-text'>
            <div className="abilities">
                {thisPokemon.abilities.map((ability)=> (
                <p>Ability: {ability.ability.name}</p>
                ))}
            </div>
            <div className="size">
                <p>Height: {thisPokemon.height /10}m</p>
                <p>Weight: {thisPokemon.weight}kg</p>
            </div>
            <p className='lorem'>While most Pokémon resemble animals and may behave like them, there are many that do not resemble animals at all, taking on other forms such as plants, inanimate objects, machines, human-like forms, or other more enigmatic and exotic appearances. Pokémon inhabit an extremely diverse range of habitats, ranging from the driest deserts to the lushest jungles, the deepest oceans to the highest mountains and everything else in between, even outer space and other dimensions. Pokémon take up various ways of living in those places. However, all can be befriended and made into potential allies and share the ability to shrink down small enough to fit into a Poké Ball.</p>
        </div>
    </div>
  )
}

export default SinglePokemon
