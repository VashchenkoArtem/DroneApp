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
    // createAddress: (
    //     req: Request<object, Address | string, CreateAddress, object>,
    //     res: Response<Address | string>
    // ) => void;
    // deleteAddress: (
    //     req: Request<{addressId: string}, Address | string, object >,
    //     res: Response<Address | string>
    // ) => void;
    // updateAddress: (
    //     req: Request<{addressId: string}, Address | string, UpdateAddress>,
    //     res: Response<Address | string>
    // ) => void;
    // getUserDeliveries: (
    //     req: Request<{userId: number}, Address[] | string, object>,
    //     res: Response<Address[] | string>
    // ) => void;
    sendContactMessage: (
        req: Request<object, { success: boolean } | string, IContactFormBody>,
        res: Response<{ success: boolean } | string>
    ) => Promise<void>;
    
}
  



export interface IUserServiceContract {
    registration: (data: CreateUser) => Promise<AuthToken | string>
    updateUser: (data: UpdateUser, id: number) => Promise<UserWithoutPassword | string>
    login: (data: UserLogin) => Promise<AuthToken | string>
    me: (id: number) => Promise<UserWithoutPassword | string>
    // createAddress: (data: CreateAddress, userId: number) => Promise<Address | string> 
    // deleteAddress: (id: number) => Promise<Address | string>
    // updateAddress: (id: number, data: UpdateAddress) => Promise<Address | string>
    // getUserDeliveries: (userId: number) => Promise<Address[] | string>
    sendContactMessage: (userId: number, data: IContactFormBody) => Promise<{ success: boolean } | string>;
}

export interface IUserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>;
    createUser: (dataWithHashedPassword: CreateUser) => Promise<UserWithoutPassword>
    updateUser: (id: number, data: UpdateUser) => Promise<UserWithoutPassword>
    findUserByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
    // createAddress: (data: CreateAddress, userId: number) => Promise<Address | null>
    // deleteAddress: (addressId: number) => Promise<Address>
    // updateAddress: (addressId: number, data: UpdateAddress) => Promise<Address>
    // getUserDeliveries: (userId: number) => Promise<Address[]>
}