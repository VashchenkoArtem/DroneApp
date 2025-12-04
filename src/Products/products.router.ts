import { Router } from 'express'
import { ProductController } from "./products.controller";

const router = Router()

router.get('/products', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getProductById)


export default router