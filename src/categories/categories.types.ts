import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"

export type CategoryWithId = Prisma.CategoryGetPayload<{}>

export type CreateCategory = Prisma.CategoryUncheckedCreateInput

export interface ICategoriesServiceContract {
    getAllCategories: () => Promise<CategoryWithId[]>,
    createCategory: (data: CreateCategory) => Promise<CategoryWithId | null>
}

export interface ICategoriesControllerContract {
    getAllCategories: (
        req: Request<object, CategoryWithId[] | string, object>,
        res: Response<CategoryWithId[] | string>
    ) => Promise<void>;
    createCategory: (
        req: Request<object, CategoryWithId | string, CreateCategory, object >,
        res: Response<CategoryWithId | string>
    ) => Promise<void>
}

export interface ICategoriesRepositoryContract {
    getAllCategories: () => Promise<CategoryWithId[]>
    createCategory: (data: CreateCategory) => Promise<CategoryWithId | null>
}