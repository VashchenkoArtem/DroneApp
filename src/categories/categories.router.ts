import express, { Router } from 'express';
import { CategoryController } from './categories.controller';

const router:Router = express.Router()

router.get('/categories', CategoryController.getAllCategories);

export default router;