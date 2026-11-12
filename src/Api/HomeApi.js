import Api from "./Api";

const HomeApi={
    Get:(skip)=>{
        console.log(typeof(skip),skip);
        
        return Api.get('/products?limit=10&skip='+skip)
    }
}
export default HomeApi