import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../axios'
const User = () => {
    const [user,setUser] = useState({})
    useEffect(()=>{
        axiosInstance.get(window.location.pathname)
                     .then(response=>setUser(response.data))
                     .catch(error=>console.log(error))
    },[])

        const showImages = user.images?user.images.map((image,index) => (
        <div key={index} className="mySlides fade" style={index<1?{display:"block"}:{}}>
            <div className="numbertext">{index+1}/{user.images.length}</div>
            <img src={image.image} style={{width:"100%",}} />
        </div>
        )):null


        let slideIndex = 1;
        function plusSlides(n) {
            showSlides(slideIndex += n);
          }
        
        
          function showSlides(n) {
            if (user.images.length){
                let i;
            let slides = document.getElementsByClassName("mySlides");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
            }
    
            slides[slideIndex-1].style.display = "block";
        }
          } 

  return (
    <div className="column is-10 is-offset-1 columns is-multiline box mt-6">
        <div className={"slideshow-container column is-half"}>

            {user.images?showImages:null}

            <a className="prev" onClick={()=>{plusSlides(-1)}}>&#10094;</a>
            <a className="next" onClick={()=>{plusSlides(1)}}>&#10095;</a>
        </div>
        <div className="column is-half">
            <h2 className="title">Name: {user.username}</h2>
            <a href={user.url}>
                <h2 className="subtitle">Firstname: {user.first_name}</h2>
            </a>
            <h2 className="subtitle">Last Name: {user.last_name}</h2>

        </div>
    </div>
  )
}


export default User