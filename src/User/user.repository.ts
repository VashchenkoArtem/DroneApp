import { PrismaClient } from "@prisma/client";
import { IUserRepositoryContract, UserWithoutPassword } from "./user.types";
import e from "express";


const client = new PrismaClient();


export const UserRepository: IUserRepositoryContract = {
    
    createUser: async (dataWithHashedPassword) => {
        try {
            const user = await client.user.create({
                data: dataWithHashedPassword,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    patronymic: true,
                    email: true,
                    birthDate: true,
                    phoneNumber: true,
                    // deliveries: true
                }
            })

            return user
        } catch (error) {
            console.error("Error in createUser repository:", error);
            throw error;
        }
    },


    findUserByEmail: async (email: string) => {
        try {
            return await client.user.findUnique({
                where: { email }
            });
        } catch (error) {
            throw error;
        }
    },

   
    findUserByIdWithoutPassword: async (id: number): Promise<UserWithoutPassword | null> => {
        try {
            const user = await client.user.findUnique({
                where: { 
                    id: Number(id) 
                },
                // include: {
                //     deliveries: true
                // }
            });

            if (!user) return null;
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as UserWithoutPassword;
        } catch (error) {
            console.error("Error in findUserById repository:", error);
            throw error;
        }
    },
    updateUser: async(userId, data) => {
        try{
            const updatedUser = await client.user.update({
                where: {
                    id: userId
                },
                data: data, 
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    patronymic: true,
                    email: true,
                    birthDate: true,
                    phoneNumber: true,
                    // deliveries: true
                }
            })
            return updatedUser
        }catch(error){
            throw error
        }
    },
    createAdress: async (data, userId) => {
        return await client.address.create({
            data: {
                city: data.city,
                street: data.street,
                numberOfHouse: Number(data.numberOfHouse),
                numberOfFlat: Number(data.numberOfFlat),
                entrance: Number(data.entrance),
                userId: Number(userId)
            }
        });
    },
    getUserDeliveries: async (userId) => {
        return await client.address.findMany({
            where: { userId: Number(userId) }
        });
    },
    getUserDeliveryById: async (adressId) => {
        return await client.address.findUnique({
            where: { id: Number(adressId) }
        });
    },

    getUserOrders: async (userId) => {
        try {
            const userOrders = await client.order.findMany({
                where: {
                    userId: userId
                },
                include: {
                    products: {
                        include: {
                            product: true
                        }
                    },
                    address: true
                },
                orderBy: {
                    id: 'desc'
                }
            });
            return userOrders;
        } catch (error) {
            throw error;
        }
    },
    createOrder: async (userId: number, data: any) => {
        try {
            const newOrder = await client.order.create({
                data: {
                    firstName: data.firstName,
                    patronymic: data.patronymic,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    comment: data.comment,
                    cityName: data.cityName,
                    paymentMethod: data.paymentMethod,
                    userId: userId,
                    products: {
                        create: data.products.map((p: { productId: number }) => ({
                            productId: p.productId
                        }))
                    },
                    addressId: data.addressId,
                    ttnNumber: data.ttnNumber
                }
            });
            return newOrder;
        } catch (error) {
            throw error;
        }
    },
    deleteAdress: async(adressId) => {
        return await client.address.delete({
            where: { id: Number(adressId) }
        });
    },
    updateAdress: async (addressId: number, data: any) => {
        return await client.address.update({
            where: {
                id: addressId
            },
            data: {
                city: data.city,
                street: data.street,
                numberOfHouse: Number(data.numberOfHouse),
                numberOfFlat: Number(data.numberOfFlat),
                entrance: Number(data.entrance)
            }
        });
    },
    checkAndResetPassword: async (newHashedPassword, code) => {
        try{
            console.log(code)
            const reset = await client.passwordReset.findUnique({
            where: {
                codeHash: code
            }
            })
            console.log(reset, reset?.isUsed)
            if (!reset || reset.isUsed) {
                throw new Error("Invalid or expired code")
            }
            await client.user.update({
                where: {
                    id: reset.userId
                },
                data: {
                    password: newHashedPassword
                }
                })
        } catch (error) {
            console.error(error);
        }
    },
    sendCodeToEmail: async(data, code) => {
        try{
            const user = await client.user.findUnique({
                where: {
                    email: data.email
                }
            })
            if (!user){
                throw new Error("User not found!")
            }
            await client.passwordReset.create({
                data: {
                    userId: user.id,
                    codeHash: code
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}
