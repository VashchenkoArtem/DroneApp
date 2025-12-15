import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"


export type User = Prisma.UserGetPayload<{}>
export type CreateUser = Prisma.UserUncheckedCreateInput


export type UserWithoutPassword = Prisma.UserGetPayload<{
    select: {
        id: true,
        firstName: true,
        patronMik: true,
        lastName: true,
        email: true,
        birthDate: true,
        phoneNumber: true,
        deliveries: true
    }
}>


export interface AuthToken {
    token: string
}

export interface IUserControllerContract {
    registration: (
        // {message: string}
        req: Request<object, AuthToken | string, CreateUser, object>,
        res: Response<AuthToken | string>
    ) => void

    // me: (
    //     req: Request<object, UserWithoutPassword | {message: string}, object, object, {userId: number}>,
    //     res: Response<UserWithoutPassword | {message: string}, {userId: number}>
    // ) => void
}
  



export interface IUserServiceContract {
    registration: (data: CreateUser) => Promise<AuthToken | string>
    // login: (data: CreateUser) => Promise<AuthToken | string>
    // me: (id: number) => Promise<UserWithoutPassword | string>
}

export interface IUserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>;
    // findUserByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
    createUser: (dataWithHashedPassword: CreateUser) => Promise<User>;
}