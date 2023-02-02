import React from "react"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useState } from "react"
import axiosInstance from "../axios"

export function Nav() {

    const {isAuthenticated,removeToken} = useContext(AuthContext)


    const [showMobileMenu,setMobileMenu]=useState(false)
    const [showSideMenu,setSideMenu]=useState(false)

    function handleLogout(){
        axiosInstance.post('/token/logout')
             .then(response=>{
                removeToken()
             }).catch(error=>console.log(error))
    }


    function toggleMobileMenu(){
        setMobileMenu(!showMobileMenu)
    }
    function toggleSideMenu(){
      setSideMenu(!showSideMenu)
  }

    return (
    <>
    <div className="navbar is-black is-fixed-top">
        <div className="navbar-brand">
        <a href='/' className="navbar-item pl-4">Petopedia</a>
        <div className="navbar-burger"
             aria-expanded="false" 
             aria-label="menu"
             data-target="menu" onClick={toggleMobileMenu}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
             </div>
        </div>
        <nav className={`navbar-menu p-0 ${showMobileMenu?'is-active':''}`} id="menu">
            <div className="navbar-start">
            <form action="/search" className="group navbar-item has-background-black">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Search pets and users" type="search" name="query" className="input" />
            </form>
            </div>
            <div className="navbar-end pr-5-md">
                <div className="buttons custom-buttons columns is-multiline has-background-black m-0">
                    {isAuthenticated?(
                        <>
                        <a href="/mypets" className="navbar-item column button is-black">My Pet List</a>
                        <a href="/myaccount" className="navbar-item column button is-black">MyAccount</a>
                        <a className="navbar-item column button is-black" onClick={handleLogout}>Logout</a>
                        </>
                    ):(
                        <>
                        <a href="/signup" className="navbar-item column button is-black">Sign Up</a>
                    <a href="/login" className="navbar-item column button is-black">Login</a>
                    </>)
                    }
                </div>
            </div>
        </nav>
    </div>
    </>
  )}
