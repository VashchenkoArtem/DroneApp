import { Router } from 'express'
import { ProductController } from "./products.controller";

const router = Router()

router.get('/products', ProductController.getAllProducts)
router.get('/products/:id', ProductController.getProductById)
router.post('/products', ProductController.createProduct)
router.delete('/products/:id', ProductController.deleteProduct)
router.patch('/products/:id', ProductController.updateProduct)
router.get('/products/suggestions', ProductController.getFilteredProducts)

export default router