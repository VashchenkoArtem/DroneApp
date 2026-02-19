import { IProductRepositoryContract, IFilteredProducts, ProductWithId, CreateProduct } from "./products.types";
import { client } from '../client/client'
import { Prisma } from "@prisma/client";

export const ProductRepository: IProductRepositoryContract = {
    getAllProducts: async (categoryId) => {
        try {
            if (categoryId){
                const products = await client.product.findMany({
                    where: { categoryId: categoryId },
                    include: { blocks: true }
                })
                return products as ProductWithId[];
            }
            const products = await client.product.findMany({
                include: { blocks: true }
            })
            return products as ProductWithId[];
        }
        catch (error) {
            throw error
        }
    },

    getProductById: async (id) => {
        try {
            const productById = await client.product.findUnique({
                where: { id: id },
                include: { blocks: true }
            })
            return productById as ProductWithId | null;
        }
        catch (error) {
            throw error
        }
    },

    createProduct: async (data: CreateProduct) => {
        try {
            const newProduct = await client.product.create({
                data: {
                    name: data.name,
                    price: Number(data.price),
                    discount: Number(data.discount),
                    image: data.image,
                    description: data.description,
                    count: Number(data.count),
                    categoryId: Number(data.categoryId)
                },
                include: {
                    blocks: true
                }
            });
            
            return newProduct as ProductWithId;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const deletedProduct = await client.product.delete({
                where: { id: id }
            })
            return deletedProduct as ProductWithId;
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    updateProduct: async (id, data) => {
        try {
            const updatedProduct = await client.product.update({
                where: { id: id },
                data: data
            })
            return updatedProduct as ProductWithId;
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getRelated: async (limit, excludedIds, filter) => {
        try {
            const products = await client.product.findMany({
                where: {
                    id: { notIn: excludedIds },
                    ...filter,
                },
                take: limit,
                include: { blocks: true }
            });
            return products as ProductWithId[];
        } catch (error) {
            throw error;
        }
    },

    getFilteredProducts: async (query: IFilteredProducts): Promise<ProductWithId[]> => {
        try {
            const { categoryId, popular, new: isNew, limit = 10, offset = 0 } = query;
            
            let orderBy: Prisma.ProductOrderByWithRelationInput = { id: 'desc' };

            if (popular) {
                orderBy = { orders: { _count: 'desc' } };
            } else if (isNew) {
                orderBy = { id: 'desc' };
            }
            if (!isNaN(Number(categoryId))){
                const products = await client.product.findMany({
                    where: {categoryId: Number(categoryId)},
                    orderBy: orderBy,
                    take: Number(limit),
                    skip: Number(offset),
                    include: { blocks: true }
                });
                return products as ProductWithId[];
            }
            const products = await client.product.findMany({
                orderBy: orderBy,
                take: Number(limit),
                skip: Number(offset),
                include: { blocks: true }
            });
            return products as ProductWithId[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    
}