import Api from './Api'

const AuthApi={
    Login:(data)=>{
        return Api.post('/auth/login',data)
    }
}

export default  AuthApi