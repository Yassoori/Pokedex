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
                    `${selectedPokemon.url}`
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
    <div>
      single pokemon
      <h2>{selectedPokemon.name}</h2>
      {thisPokemon.types.map((item)=> (
        <p>{item.type.name}</p>
      ))}
    </div>
  )
}

export default SinglePokemon
