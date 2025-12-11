import { ICategoriesRepositoryContract } from "./categories.types";
import { client } from '../client/client'
import { Prisma } from "@prisma/client";

export const CategoriesRepository: ICategoriesRepositoryContract = {
    getAllCategories: async() => {
        try{
            const categories:Prisma.CategoryGetPayload<{}>[] = await client.category.findMany()
            return categories;
        } catch (error){
            throw error
        }
    }
}
