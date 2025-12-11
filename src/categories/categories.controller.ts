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
    }
}
