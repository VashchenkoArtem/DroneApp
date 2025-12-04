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
    }
}