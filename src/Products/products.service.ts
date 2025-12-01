import { ProductRepository } from "./products.repository";
import { IProductServiceContract } from "./products.types";

export const ProductService: IProductServiceContract = {
    getAllProducts: async() => {
        const products = await ProductRepository.getAllProducts()
        return products
    }
}