import { ProductService } from "./products.service";
import { IProductControllerContract } from "./products.types";

export const ProductController: IProductControllerContract = {
    getAllProducts: async(req, res): Promise<void> => {
        req = req
        const response = await ProductService.getAllProducts();
        if (response.length === 0){
            res.status(204).json("Товарів поки що немає")
        }
        res.status(200).json(response)
    },

    getProductById: async(req, res) => {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
			res.status(400).json("Id must be a number");
			return;
		}
		const product = await ProductService.getProductById(id);
		if (!product) {
			res.status(404).json("Product was not found");
			return;
		}
		res.status(200).json(product);
    },

    createProduct: async(req, res) => {
        const data = req.body
        const cretaedProduct = await ProductService.createProduct(data)
        res.status(201).json(cretaedProduct);
    }, 

    deleteProduct: async(req, res) => {
        const id = Number(req.params.id)

        // if (Number.isNaN(id)) { 
        //     res.status(400).json("Id must be a number")
        //     return
        // }

        const product = await ProductService.deleteProduct(id)

        // if (!product) {
        //     res.status(500).json("There was something wrong. Try again")
        //     return
        // }
        res.status(200).json(product)
    }
}