import Api from './Api'

const ProductsApi={
    GetByCat:(catid)=>{
        return Api.get('/products/category/'+catid)
    },
    GetAllProductsApi:()=>{
         return Api.get('/products')
    },
    GetById:(id)=>{
        return Api.get('/products/'+id)
    },
    Search:(query)=>{
        return Api.get('/products/search?q='+query)
    },
    Create:(post)=>{
        return Api.post('/products/add',post)
    },
    Dlelte:(id)=>{
        return Api.delete('/products/'+id)
    },
    Update:(id,post)=>{
        return Api.put('/products/'+id,post)
    }

}

export default ProductsApi;