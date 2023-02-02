import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "bulma-toast"
import axiosInstance from "../axios"
const Login = ()=>{
    const navigate = useNavigate()

    const {setToken}=useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')


    function handleChange(e){
        const {name,value} = e.target
        if (name === 'username'){
            setUsername(value)
        }
        if (name === 'password'){
            setPassword(value)
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        const data = {
            username,
            password
        }

        axiosInstance.post('/token/login',data)
             .then(response=>{
                const token = response.data.auth_token
                setToken(token)
                toast({
                    message:'Login successful. Redirecting to home page.',
                    dismissible:true,
                    pauseOnHover:true,
                    duration:1500,
                    position:"bottom-right",
                    type:"is-success"
                })
                navigate('/')
             }).catch(error =>{
                console.log(error)
                toast({
                    message:'Something went wrong. Please try again',
                    dismissible:true,
                    pauseOnHover:true,
                    duration:1500,
                    position:"bottom-right",
                    type:"is-warning"
                })
             })
    }

    return (
        <>
        <div className="column is-4 is-offset-4 mt-6 columns box">
            <form onSubmit={(e)=>{handleSubmit(e)}} className="column is-fullwidth">
                <h2 className="title">Login</h2>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <div className="control">
                        <input type="text" name="username" value={username} onChange={(e)=>{handleChange(e)}} className="input" required/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="control">
                        <input type="password"  className="input" name="password" value={password} onChange={(e)=>{handleChange(e)}} required/>
                    </div>
                </div>
                <button className="button is-dark" type="submit">Login</button>
            </form>
        </div>
        </>
    )

}


export default Login