import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type ProductWithId = Prisma.ProductGetPayload<{}>

export type CreateProduct = Prisma.ProductUncheckedCreateInput

export type UpdateProduct = Prisma.ProductUncheckedUpdateInput

export interface IProductServiceContract {
    getAllProducts: () => Promise<ProductWithId[]>
    getProductById: (id: number) => Promise<ProductWithId[] | null>
    // createProduct: (data: CreateProduct) => Promise<ProductWithId[] | null>
    // updatProduct: (id: number, data: UpdateProduct) => Promise<ProductWithId[] | null>
    // deleteProduct: (id: number) => Promise<ProductWithId[] | null>
}

export interface IProductControllerContract {
    getAllProducts: (
        req: Request<object, ProductWithId[] | string, object>,
        res: Response<ProductWithId[] | string>
    ) => Promise<void>;
    getProductById: (
        req: Request<{id: string}, ProductWithId | string, object>,
        res: Response<ProductWithId | string>
    ) => Promise<void>;

    // createProduct: (
    //     req: Request<>,
    //     res: Response<>
    // ) => Promise<void>
    // updateProduct: (
    //     req: Request<>,
    //     res: Response<>
    // ) => Promise<void>
    // deleteProduct: (
    //     req: Request<>,
    //     res: Response<>
    // ) => Promise<void>
}

export interface IProductRepositoryContract {
    getAllProducts: () => Promise<ProductWithId[]>
    getProductById: (id: number) => Promise<ProductWithId[] | null>
    // createProduct: (data: CreateProduct) => Promise<ProductWithId[] | null>
    // updateProduct: (id: number, data: UpdateProduct) => Promise<ProductWithId[] | null>
    // deleteProduct: (id: number) => Promise<ProductWithId[] | null>
}