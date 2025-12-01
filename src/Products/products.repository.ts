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
    }
}