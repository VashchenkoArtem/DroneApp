import { Router } from 'express'
import { ProductController } from "./products.controller";

const router = Router()

router.get('/products', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getProductById)
router.post('/products', ProductController.createProduct)

export default router