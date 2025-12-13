import { ProductRepository } from "./products.repository";
import { IProductServiceContract } from "./products.types";

export const ProductService: IProductServiceContract = {
    getAllProducts: async(categoryId) => {
        const products = await ProductRepository.getAllProducts(categoryId)
        if (!products){
            return null
        }
        return products
    },
    getProductById: async(id) => {
        const productById = await ProductRepository.getProductById(id)
        return productById
    },

    createProduct: async(data) => {
        const newProduct = await ProductRepository.createProduct(data)
        return newProduct
    },

    deleteProduct: async(id) => {
        const deletedProduct = await ProductRepository.deleteProduct(id)
        return deletedProduct
    },
    updateProduct: async(id, data) => {
        const updatedProduct = await ProductRepository.updateProduct(id, data)
        return updatedProduct
    }
}