import Api from "./Api";

const CatagoryApi={
    Get:()=>{
        return Api.get('/products/categories')
    }
}

export default CatagoryApi