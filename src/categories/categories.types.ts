import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"

export type CategoryWithId = Prisma.CategoryGetPayload<{}>

export interface ICategoriesServiceContract {
    getAllCategories: () => Promise<CategoryWithId[]>
}

export interface ICategoriesControllerContract {
    getAllCategories: (
        req: Request<object, CategoryWithId[] | string, object>,
        res: Response<CategoryWithId[] | string>
    ) => Promise<void>;
}

export interface ICategoriesRepositoryContract {
    getAllCategories: () => Promise<CategoryWithId[]>
}
