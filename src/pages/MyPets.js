import axiosInstance from "../axios"
import { useState } from "react"
import { useEffect } from "react"
import { PetBox } from "../components/PetBox"
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const MyPets = () => {
    const [myPets,setMyPets] = useState([])
    const {isAuthenticated} = useContext(AuthContext)
    const navigate  = useNavigate()

    useEffect(()=>{
      if (!isAuthenticated){
        return navigate('/login')
    }
      axiosInstance.get('/me')
          .then(response=>{
              axiosInstance.get(`${response.data.url}pets/`)
                  .then(res=>setMyPets(res.data))
                  .catch(error=>console.log(error))
          }).catch(error=>console.log(error))

      },[])

    const petsBoxes = myPets.map(pet=><PetBox pet={pet} key={pet.id} />)
    // useEffect(()=>{
    //   const petsBoxes = myPets.map(pet=><PetBox pet={pet} />)
    // })

  return (
    <div className="column is-10 is-offset-1 columns is-multiline">
        <div className="column is-fullwidth columns is-multiline is-align-items-center box mt-6">
          <div className="column is-4 is-size-3 columns">My Pets</div>
          <div className="column is-4 is-offset-4 columns is-justify-content-flex-end">
            <a href="/add-pet" className="button is-info">Add a new pet</a>
          </div>
          {petsBoxes.length?<div className="column is-fullwidth box has-background-light columns is-multiline" style={{gap:"1rem",}}>
          {petsBoxes}
        </div>:null}
        </div>
    </div>
  )
}


export  default MyPets