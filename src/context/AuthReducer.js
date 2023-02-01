import axiosInstance from "../axios"
export default (state,action)=>{
    switch(action.type){
        case 'removeToken':
            return {
                ...state,
                token:'',
                isAuthenticated:false
            }
        case 'setToken':
            return {
                ...state,
                token: action.payload,
                isAuthenticated:true
            }

        default:
            return state
    }
}

