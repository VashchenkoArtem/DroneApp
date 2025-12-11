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
    },

    createCategory: async(data) => {
        try {
            const createdCategory = await client.category.create({data})
            return createdCategory
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === 'P2007') {
                    console.log('Data was entered wring. Try again')
                }
            }
            throw error
        }
    }
}
