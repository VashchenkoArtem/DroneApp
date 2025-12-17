import type { Request, Response } from "express";
import { Prisma } from "@prisma/client"


export type User = Prisma.UserGetPayload<{}>
export type CreateUser = Prisma.UserUncheckedCreateInput


export type UserWithoutPassword = Prisma.UserGetPayload<{
    include: { 
        deliveries: true 
    };
}>


export interface AuthToken {
    token: string
}

export interface ErrorResponse {
    message: string;
}

export interface AuthenticatedUser {
	id: number;
}


export interface IUserControllerContract {
    registration: (
        req: Request<object, AuthToken | ErrorResponse | string, CreateUser>,
        res: Response<AuthToken | ErrorResponse | string>
    ) => Promise<Response | void>;
    me: (
        req: Request, 
        res: Response<UserWithoutPassword | {message: string}>
    ) => Promise<Response | void>;
}
  



export interface IUserServiceContract {
    registration: (data: CreateUser) => Promise<AuthToken | string>
    // login: (data: CreateUser) => Promise<AuthToken | string>
    me: (id: number) => Promise<UserWithoutPassword | string>
}

export interface IUserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>;
    createUser: (dataWithHashedPassword: CreateUser) => Promise<User>;
    findUserByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
}