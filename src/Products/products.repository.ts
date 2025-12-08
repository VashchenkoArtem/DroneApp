import { IProductRepositoryContract } from "./products.types";
import { client } from '../client/client'

export const ProductRepository: IProductRepositoryContract = {
    getAllProducts: async() => {
        try{
            const products = await client.product.findMany()
            return products;
        }
        catch(error){
            throw error
        }
    },

    getProductById: async(id) => {
        try{
            const productById = await client.product.findUnique({
                where: {
                    id: id
                }
            })
            return productById;
        }
        catch(error){
            throw error
        }
    },

    createProduct: async(data) => {
        try {
            const createdProduct = await client.product.create({data: data})
            return createdProduct
        } catch (error) {
            console.log (error)
            throw error
        }
    },

    deleteProduct: async(id) => {
        try {
            const deletedProduct = await client.product.delete({id: id})
            return deletedProduct
        } catch (error) {
            console.log (error)
            throw error
        }
    }
}