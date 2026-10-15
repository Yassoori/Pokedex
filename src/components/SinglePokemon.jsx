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
    const [flavourText, setFlavourText] = useState('')
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchPokeData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `${selectedPokemon.url}`,
                )
                const speciesResponse = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`
                )
                const englishFlavourText = speciesResponse.data.flavor_text_entries.find(
                    (entry) => entry.language.name === 'en'
                )

                console.log(response.data);
                setThisPokemon(response.data)
                setFlavourText(englishFlavourText?.flavor_text.replace(/[\f\n]/g, ' ') ?? '')
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
            <p className='flavour-text'>{flavourText}</p>
            <div className="abilities-size">
                <div className="abilities">
                    {thisPokemon.abilities.map((ability)=> (
                    <p>Ability: {ability.ability.name}</p>
                    ))}
                </div>
                <div className="size">
                    <p>Height: {thisPokemon.height /10}m</p>
                    <p>Weight: {thisPokemon.weight}kg</p>
                </div>
            </div>
            <button id='back' onClick={() => {navigate('/')}}>Back</button>
        </div>
    </div>
  )
}

export default SinglePokemon
