import {configureStore} from '@reduxjs/toolkit'
import { UserSlice,UserInfoSlice,CartSlice,WhiteListSlice,BuySlice,ProductSlice,OrderSlice} from '../Features/AllFeatures'

const saveUser=localStorage.getItem("user")
const saveInfo=localStorage.getItem("Info")
const saveCart=localStorage.getItem("Cart")
const saveWhiteList=localStorage.getItem("WhiteList")
const saveOrder=localStorage.getItem("Order")

const Store=configureStore({
    reducer:{
        User:UserSlice,
        Info:UserInfoSlice,
        Cart:CartSlice,
        WhiteList:WhiteListSlice,
        Buy:BuySlice,
        Product:ProductSlice,
        Order:OrderSlice
    },
    preloadedState:{
        User:saveUser ?
        JSON.parse(saveUser) : undefined,
        Info:saveInfo ?
        JSON.parse(saveInfo) : undefined,
        Cart:saveCart ?
        JSON.parse(saveCart) : undefined,
        WhiteList:saveWhiteList ?
        JSON.parse(saveWhiteList) : undefined,
        Order:saveOrder ?
        JSON.parse(saveOrder) : undefined
    }
})

Store.subscribe(()=>{
    const state=Store.getState()
    localStorage.setItem("user",JSON.stringify(state.User))
    localStorage.setItem("Info",JSON.stringify(state.Info))
    localStorage.setItem("Cart",JSON.stringify(state.Cart))
    localStorage.setItem("WhiteList",JSON.stringify(state.WhiteList))
    localStorage.setItem("Order",JSON.stringify(state.Order))
})

export default Store