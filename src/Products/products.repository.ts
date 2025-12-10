import { IProductRepositoryContract } from "./products.types";
import { client } from '../client/client'
import { Prisma } from "@prisma/client";

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
            const { blocks, ...productData } = data
            const createdProduct = await client.product.create({
                data: { ...productData,
                    blocks: {
                        createMany: {
                            data: blocks as Prisma.ProductBlockCreateManyProductInput[]
                        }
                    }
                 },
                 include: {
                    blocks: true
                 }
            })
            return createdProduct
        } catch (error) {
            throw error
        }
    },

    deleteProduct: async(id) => {
        try {
            const deletedProduct = await client.product.delete({
                where: {
                    id: id
                }
            })
            return deletedProduct
        } catch (error) {
            console.log (error)
            throw error
        }
    },
    
    updateProduct: async(id, data) => {
        try {
            const updatedProduct = await client.product.update({
                where: {id: id},
                data: data
            })
            return updatedProduct
        } catch (error) {
            console.log (error)
            throw error
        }
    }}