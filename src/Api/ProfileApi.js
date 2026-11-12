import Api from "./Api"

const ProfileApi={
    Get: (id)=>{
        return Api.get('/users/'+id)
    },

    UpdateProfile:()=>{} 
}

export default ProfileApi;