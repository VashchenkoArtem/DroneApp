import { ProductService } from "./products.service";
import { IProductControllerContract } from "./products.types";

export const ProductController:IProductControllerContract = {
    getAllProducts: async(req, res): Promise<void> => {
        req = req
        const response = await ProductService.getAllProducts();
        res.status(200).json(response)
    },

    getProductById: async(req, res) => {
        const id = Number(req.params.id)

        // if (Number.isNaN(id)) {
		// 	res.status(400).json("ID must be integer");
		// 	return;
		// }

		const product = await ProductService.getProductById(id);
		// if (!product) {
		// 	res.status(404).json("Product not found");
		// 	return;
		// }
		res.status(200).json(product);
    }
}