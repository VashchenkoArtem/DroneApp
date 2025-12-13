import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"

export type ProductWithId = Prisma.ProductGetPayload<{}>

export type CreateProduct = Prisma.ProductUncheckedCreateInput

export type UpdateProduct = Prisma.ProductUncheckedUpdateInput

export interface IProductServiceContract {
    getAllProducts: (categoryId: number) => Promise<ProductWithId[] | null>
    deleteProduct: (id: number) => Promise<ProductWithId | null>
    getProductById: (id: number) => Promise<ProductWithId | null>
    createProduct: (data: CreateProduct) => Promise<ProductWithId | null>
    updateProduct: (id: number, data: UpdateProduct) => Promise<ProductWithId | null>
}

export interface IProductControllerContract {
    getAllProducts: (
        req: Request<{categoryId: number}, ProductWithId[] | string, object>,
        res: Response<ProductWithId[] | string>
    ) => Promise<void>;

    getProductById: (
        req: Request<{id: number}, ProductWithId | string, object>,
        res: Response<ProductWithId | string>
    ) => Promise<void>;
    createProduct: (
        req: Request<object, ProductWithId | string, CreateProduct, object>,
        res: Response<ProductWithId | string>
    ) => Promise<void>

    deleteProduct: (
        req: Request<{id: string}, ProductWithId | string, object>,
        res: Response<ProductWithId | string>
    ) => Promise<void>
    updateProduct: (
        req: Request<{id: string}, ProductWithId | string, UpdateProduct, object>,
        res: Response<ProductWithId | string>
    ) => Promise<void>
}

export interface IProductRepositoryContract {
    getAllProducts: (categoryId: number) => Promise<ProductWithId[]>
    getProductById: (id: number) => Promise<ProductWithId | null>
    createProduct: (data: CreateProduct) => Promise<ProductWithId | null>
    deleteProduct: (id: number) => Promise<ProductWithId | null>
    updateProduct: (id: number, data: UpdateProduct) => Promise<ProductWithId | null>
}