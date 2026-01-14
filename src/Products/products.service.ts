import { ProductRepository } from "./products.repository";
import { 
    IProductServiceContract, 
    IFilteredProducts, 
    ProductWithId 
} from "./products.types";


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
    },
    getFilteredProducts: async (query: IFilteredProducts): Promise<ProductWithId[] | null> => {
        const isPopular = String(query.popular) === 'true';
        const isNew = String(query.new) === 'true';
        if (isPopular && isNew) {
            return null; 
        }

        const products = await ProductRepository.getFilteredProducts({
            popular: isPopular,
            new: isNew,
            limit: query.limit ? Number(query.limit) : 10,
            offset: query.offset ? Number(query.offset) : 0
        });

        return products;
    },
}