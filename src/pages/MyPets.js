import axiosInstance from "../axios"
import { useState } from "react"
import { useEffect } from "react"
import { PetBox } from "../components/PetBox"
const MyPets = () => {
    const [myPets,setMyPets] = useState([])

    useEffect(()=>{
        axiosInstance.get('/mypets')
             .then(response=>{
                setMyPets(response.data)
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
          <div className="column is-fullwidth box has-background-light columns is-multiline">
          {petsBoxes}
        </div>
        </div>
    </div>
  )
}


export  default MyPets