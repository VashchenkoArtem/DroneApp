import { ProductService } from "./products.service";
import { IProductControllerContract, IFilteredProducts } from "./products.types";

export const ProductController: IProductControllerContract = {
    getAllProducts: async(req, res): Promise<void> => {
        const categoryFilter = Number(req.query.categoryId);
        if (Number.isNaN(categoryFilter)){
            res.status(400).json(`Id does not found`)
            return;
        }
        const response = await ProductService.getAllProducts(categoryFilter);
        if (!response || response.length === 0){
            res.status(204).json("There is no products now")
            return;
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
        const createdProduct = await ProductService.createProduct(data)
        if (!data){
            res.status(422).json('There is lack of data. Enter more information.')
            return;
        }

        if (!createdProduct){
            res.status(500).json('There went something wrong on server side')
            return;
        }
        res.status(201).json(createdProduct);
    }, 

    deleteProduct: async(req, res) => {
        const id = Number(req.params.id)

        if (Number.isNaN(id)) { 
            res.status(400).json("Id must be a number")
            return
        }

        const product = await ProductService.deleteProduct(id)

        if (!product) {
            res.status(500).json("There was something wrong. Try again")
            return
        }
        res.status(200).json(product)
    },

    updateProduct: async(req, res) => {
        const id = Number(req.params.id)
        const data = req.body
        if (Number.isNaN(id)) {
            res.status(400).json("ID must be integer");
            return;
        }

        if (typeof data === 'undefined') {
            res.status(422).json("Please, enter a fields, which you want to update");
            return;
        }
        const updatedProduct = await ProductService.updateProduct(id, data)
        if (!updatedProduct){
            res.status(500).json('There went something wrong on server side')
            return;
        }
        
        res.status(200).json(updatedProduct);
    },

    getFilteredProducts: async (req, res) => {
        try {
            const queryParams: IFilteredProducts = {
                ...req.query,
                sameAs: req.query.sameAs ? Number(req.query.sameAs) : undefined
            };

            const products = await ProductService.getFilteredProducts(queryParams);
            
            if (products === null) {
                res.status(400).json("Параметри 'popular' та 'new' не можуть бути використані одночасно.");
                return;
            }

            if (products.length === 0) {
                res.status(204).send();
                return;
            }

            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json("Внутрішня помилка сервера");
        }
    },
}