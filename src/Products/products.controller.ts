import { ProductService } from "./products.service";
import { IProductControllerContract } from "./products.types";

export const ProductController:IProductControllerContract = {
    getAllProducts: async(req, res): Promise<void> => {
        req = req
        const response = await ProductService.getAllProducts();
        res.status(200).json(response)
    }
}