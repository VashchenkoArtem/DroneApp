import { CategoriesService } from "./categories.service";
import { ICategoriesControllerContract } from "./categories.types";

export const CategoryController: ICategoriesControllerContract = {
    getAllCategories: async(req, res): Promise<void> => {
        req = req
        const response = await CategoriesService.getAllCategories();
        if (response.length === 0){
            res.status(204).json("Категорій поки що немає")
        }
        res.status(200).json(response)
    },
    createCategory: async(req, res): Promise<void> => {
        const data = req.body
        const createdCategory = await CategoriesService.createCategory(data)

        if (!data){
            res.status(422).json('There is lack of data. Enter more information.')
            return;
        }

        if (!createdCategory){
            res.status(500).json('There went something wrong on server side')
            return;
        }

        res.status(201).json(createdCategory)
    }
}
