import type { Request, Response } from "express";
import type { Prisma } from "@prisma/client"


export type User = Prisma.UserGetPayload<{}>

export type CreateUser = Prisma.UserUncheckedCreateInput

export type UpdateUser = Prisma.UserUpdateInput

export type UserWithoutPassword = Prisma.UserGetPayload<{
    select: {
        id: true,
        firstName: true,
        patronymic: true,
        lastName: true,
        email: true,
        birthDate: true,
        phoneNumber: true,
        // deliveries: true
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

export interface ErrorResponse {
    message: string;
}

// export type Address = Prisma.AddressGetPayload<{}>;
// export type CreateAddress = Prisma.AddressCreateWithoutUserInput;
// export type UpdateAddress = Prisma.AddressUpdateInput;

export interface IContactFormBody {
    phone: string;
    message: string;
}
export type Address = Prisma.AddressGetPayload<{}>
export type CreateAddress = Prisma.AddressCreateWithoutUserInput
export type UpdateAddress = Prisma.AddressUpdateInput

export type Order = Prisma.OrderGetPayload<{}>
export type CreateOrder = Prisma.OrderUncheckedCreateInput

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
    me: (
        req: Request<object, UserWithoutPassword | string, object, object, {userId: number}>, 
        res: Response<UserWithoutPassword | string>
    ) => Promise<Response | void>;
    sendContactMessage: (
        req: Request<object, { success: boolean } | string, IContactFormBody>,
        res: Response<{ success: boolean } | string>
    ) => Promise<void>;
    
    createAdress: (
        req: Request<object, Address | string, CreateAddress, object>,
        res: Response<Address | string>
    ) => void,
    deleteAdress: (
        req: Request<{addressId: number}, Address | string, object >,
        res: Response<Address | string>
    ) => void,
    updateAdress: (
        req: Request<{adressId: number}, Address | string, UpdateAddress>,
        res: Response<Address | string>
    ) => void, 
    getUserDeliveries: (
        req: Request<{userId: number}, Address[] | string, object>,
        res: Response<Address[] | string>
    ) => void,

    getUserDeliveryById: (
        req: Request<{adressId: number}, Address | string, object>,
        res: Response<Address | string>
    ) => void,

    getUserOrders: (
        req: Request<{userId: number}, Order[] | string, object>,
        res: Response<Order[] | string>
    ) => void,
    createOrder: (
        req: Request<object, Order | string, CreateOrder, object>,
        res: Response<Order | string>
    ) => void
}
  



export interface IUserServiceContract {
    registration: (data: CreateUser) => Promise<AuthToken | string>
    updateUser: (data: UpdateUser, id: number) => Promise<UserWithoutPassword | string>
    login: (data: UserLogin) => Promise<AuthToken | string>
    me: (id: number) => Promise<UserWithoutPassword | string>
    sendContactMessage: (userId: number, data: IContactFormBody) => Promise<{ success: boolean } | string>;
    createAdress: (data: CreateAddress, userId: number) => Promise<Address | string> 
    deleteAdress: (id: number) => Promise<Address | string>
    updateAdress: (id: number, data: UpdateAddress) => Promise<Address | string>
    getUserDeliveries: (userId: number) => Promise<Address[] | string>
    getUserDeliveryById: (id: number) => Promise<Address | string>
    getUserOrders: (userId: number) => Promise<Order[] | string>
    createOrder: (userId: number, data: CreateOrder) => Promise<Order | string>
}

export interface IUserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>;
    createUser: (dataWithHashedPassword: CreateUser) => Promise<UserWithoutPassword>
    updateUser: (id: number, data: UpdateUser) => Promise<UserWithoutPassword>
    findUserByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
    createAdress: (data: CreateAddress, userId: number) => Promise<Address | null>
    deleteAdress: (adressId: number) => Promise<Address>
    updateAdress: (adressId: number, data: UpdateAddress) => Promise<Address>
    getUserDeliveries: (userId: number) => Promise<Address[]>
    getUserDeliveryById: (adressId: number) => Promise<Address | null>
    getUserOrders: (userId: number) => Promise<Order[]>
    createOrder: (userId: number, data: CreateOrder) => Promise<Order>
}