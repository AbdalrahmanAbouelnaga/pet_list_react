import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'
import {PetBox} from '../components/PetBox'
import { UserBox } from '../components/UserBox'
const Search = () => {
    const [query,setQuery] = useState('')
    const [resList,setResList] = useState([])
    useEffect(()=>{
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            setQuery(params.get('query'))
        }
    },[])
    useEffect(()=>{
        if (query!==''){
        axiosInstance.post('/search/',{'query':query})
                     .then(response=>{
                        setResList(response.data)
                        console.log(response.data)
                    })
                     .catch(error=>console.log(error))}
         
    },[query])
    const petResults = resList.pets?resList.pets.map(pet=><PetBox pet={pet} key={pet.id}/>):null
    const userResults = resList.users?resList.users.map(user=><UserBox user={user} key={user.id}/>):null
  return (
    <div className="column is-10 is-offset-1 is-multiline">
        <div className="column is-fullwidth has-text-centered">
            Search query: {query}
        </div>
        <div className="column is-full is-multiline">
                {petResults}
                {userResults}
        </div>
    </div>
  )
}

export default Search