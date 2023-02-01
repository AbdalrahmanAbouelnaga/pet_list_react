import React, { createContext, useReducer} from "react";
import { json } from "react-router-dom";
import AuthReducer from './AuthReducer'

let initialState = {}

if (localStorage.getItem('token')){
        initialState = {
            token:localStorage.getItem('token'),
            isAuthenticated:true,
        }
    }else {
    initialState = {
        token: '',
        isAuthenticated:false,
    }
}


export const AuthContext = createContext(initialState)



export const AuthProvider =  ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,initialState)
    

    function setToken(token){
        localStorage.setItem('token',token)
        dispatch({
            type:'setToken',
            payload:token
        })
    }
    function removeToken(){
        localStorage.removeItem('token')
        dispatch({
            type:'removeToken',
        })
    }


    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            setToken,
            removeToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}