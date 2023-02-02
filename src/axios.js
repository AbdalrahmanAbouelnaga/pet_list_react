import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL
})


axiosInstance.interceptors.request.use((config)=>{
    if (localStorage.getItem('token')){
        config.headers.Authorization = 'Token '+localStorage.getItem('token')
    }else{
        config.headers.Authorization = ''
    }
    return config
},error=>console.log(error))

export default axiosInstance 