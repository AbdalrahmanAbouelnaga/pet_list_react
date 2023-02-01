import axiosInstance from "../axios"
import { useState } from "react"
import { useEffect } from "react"

export const MyPets = () => {
    const [my,setPetList] = useState([])

    useEffect(()=>{
        axios.get('/mypets')
             .then(response=>{
                setPetList (response.data)
             }).catch(error=>console.log(error))
    },[])

  return (
    <div className="column is-10 is-offset-1 columns is-multiline">
        <div className="column is-fullwidth columns">
          <div className="column is-4">My Pets</div>
          <div className="column is-4 is-offset-4">
            <a href="/add-pet" className="button is-info">Add a new pet</a>
          </div>
        </div>
    </div>
  )
}
