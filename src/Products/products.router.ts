import { Router } from 'express'
import { ProductController } from "./products.controller";

const router = Router()

router.get('/products', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getProductById)
router.post('/products', ProductController.createProduct)
router.patch('/products/:id', ProductController.updateProduct)

export default router