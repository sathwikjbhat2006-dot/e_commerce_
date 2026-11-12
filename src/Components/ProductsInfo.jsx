import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseProducts from "../Hooks/UseProducts";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Products from "./Products";
import ShowingReleatedItems from "./ShowingReleatedItems";


export default function ProductsInfo() {
    const { id } = useParams()
    const { error, loading, products, GetProductsById } = UseProducts()

    useEffect(() => {
        if (id) {
            GetProductsById(id)
        }
    }, [id])


    if (error) {
        return <ErrorPage msg={error} />
    }
    if (loading) {
        return <LoadingPage />
    }

    return (
        <>
            <Products products={products} />
            <ShowingReleatedItems category={products?.category} productid={products?.id} />
        </>
    )
}