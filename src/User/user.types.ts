import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"


export type User = Prisma.UserGetPayload<{}>

export type CreateUser = Prisma.UserUncheckedCreateInput

export type UpdateUser = Prisma.UserUpdateInput

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

export type UserLogin = {
    email: string,
    password: string
}

export type AuthenticatedUser = {
    id: number
}

export interface AuthToken {
    token: string
}

export interface IUserControllerContract {
    registration: (
        // {message: string}
        req: Request<object, AuthToken | string, CreateUser, object>,
        res: Response<AuthToken | string>
    ) => void,
    updateUser: (
        req: Request<{id: number}, UserWithoutPassword | string, UpdateUser, object>,
        res: Response<UserWithoutPassword | string>
    ) => void,

    login: (
        req: Request<
            object,
            AuthToken | string,
            UserLogin,
            object
        >,
        res: Response<AuthToken | string> 
    ) => void,

    // me: (
    //     req: Request<object, UserWithoutPassword | {message: string}, object, object, {userId: number}>,
    //     res: Response<UserWithoutPassword | {message: string}, {userId: number}>
    // ) => void
}
  



export interface IUserServiceContract {
    registration: (data: CreateUser) => Promise<AuthToken | string>
    updateUser: (data: UpdateUser, id: number) => Promise<UserWithoutPassword | string>
    login: (data: UserLogin) => Promise<AuthToken | string>
    // login: (data: CreateUser) => Promise<AuthToken | string>
    // me: (id: number) => Promise<UserWithoutPassword | string>
}

export interface IUserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>;
    // findUserByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
    createUser: (dataWithHashedPassword: CreateUser) => Promise<UserWithoutPassword>
    updateUser: (id: number, data: UpdateUser) => Promise<UserWithoutPassword>
}