import { ProductRepository } from "./products.repository";
import { IProductServiceContract } from "./products.types";

export const ProductService: IProductServiceContract = {
    getAllProducts: async() => {
        const products = await ProductRepository.getAllProducts()
        return products
    },

    getProductById: async(id) => {
        const productById = await ProductRepository.getProductById(id)
        // if (!productById) return null
        return productById
    },
    createProduct: async(data) => {
        const newProduct = await ProductRepository.createProduct(data)
        return newProduct
    }
}