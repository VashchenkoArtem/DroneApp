import { CategoriesRepository } from "./categories.repository";
import { ICategoriesServiceContract } from "./categories.types";

export const CategoriesService: ICategoriesServiceContract = {
    getAllCategories: async() => {
        const categories = await CategoriesRepository.getAllCategories()
        return categories
    },

    createCategory: async(data) => {
        const newCategory = await CategoriesRepository.createCategory(data)
        return newCategory   
    }
}