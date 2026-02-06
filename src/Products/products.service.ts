import { Prisma } from "@prisma/client";
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
        const sameAsId = query.sameAs ? Number(query.sameAs) : null;

        if (isPopular && isNew) return null;

        if (sameAsId && !Number.isNaN(sameAsId)) {
            const original = await ProductRepository.getProductById(sameAsId);
            if (!original) return [];

            const limit = query.limit ? Number(query.limit) : 10;
            
            let results: ProductWithId[] = [original]; 
            let excludedIds: number[] = [original.id];

            const effectiveLimit = limit - 1;

            if (effectiveLimit > 0) {
                const words = original.name.split(' ').filter(word => word.length > 2);
                const nameFilter: Prisma.ProductWhereInput = { 
                    OR: words.map(w => ({ name: { contains: w } })) 
                };
                
                const byName = await ProductRepository.getRelated(effectiveLimit, excludedIds, nameFilter);
                results = [...results, ...byName];
                excludedIds.push(...byName.map((p: ProductWithId) => p.id));

                if (results.length < limit) {
                    const byCat = await ProductRepository.getRelated(
                        limit - results.length, 
                        excludedIds, 
                        { categoryId: original.categoryId }
                    );
                    results = [...results, ...byCat];
                    excludedIds.push(...byCat.map((p: ProductWithId) => p.id));
                }

                if (results.length < limit) {
                    const range = original.price * 0.2;
                    const byPrice = await ProductRepository.getRelated(
                        limit - results.length, 
                        excludedIds, 
                        { price: { gte: original.price - range, lte: original.price + range } }
                    );
                    results = [...results, ...byPrice];
                }
            }

            return results;
        }

        return await ProductRepository.getFilteredProducts({
            popular: isPopular,
            new: isNew,
            limit: query.limit,
            offset: query.offset,
            categoryId: query.categoryId
        });
    }
}