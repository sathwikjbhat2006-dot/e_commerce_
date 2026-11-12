import Api from "./Api";

const MyCartApi={
    Get:(id)=>{
        return Api.get('/carts/user/'+id)
    }
}

export default MyCartApi