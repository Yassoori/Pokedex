import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'
import { Puff } from 'react-loader-spinner'
import axios from 'axios'


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
        return <Puff color="#00BFFF" height={100} width={100}/>
    }
  return (
    <div className='pokedetails'>
        <h2>{selectedPokemon.name}</h2>
        {/* <img src={thisPokemon.sprites.front_default} alt="" /> */}
        <img src={thisPokemon.sprites.other['official-artwork'].front_default} alt={selectedPokemon.name} className="image"/>
        {thisPokemon.types.map((type)=> (
        <p>{type.type.name}</p>
        ))}
        {thisPokemon.abilities.map((ability)=> (
        <p>{ability.ability.name}</p>
        ))}
        <p>{thisPokemon.height}</p>
        <p>{thisPokemon.weight}</p>
    </div>
  )
}

export default SinglePokemon
