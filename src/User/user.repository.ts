import { Order, Prisma, PrismaClient } from "@prisma/client";
import { Address, CreateOrder, IUserRepositoryContract, UpdateAddress, UserWithoutPassword } from "./user.types";
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
    createAdress: async (data, userId): Promise<Address | null> => {
        try {
            return await client.address.create({
                data: {
                    city: data.city,
                    street: data.street,
                    numberOfHouse: Number(data.numberOfHouse) || 0,
                    numberOfFlat: Number(data.numberOfFlat) || 0,
                    entrance: Number(data.entrance) || 0,
                    userId: Number(userId)
                }
            });
        } catch (error) {
            console.error("Error creating address:", error);
            return null;
        }
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
    createOrder: async (userId: number, data: CreateOrder): Promise<Order> => {
        return await client.order.create({
            data: {
                firstName: data.firstName,
                patronymic: data.patronymic,
                phoneNumber: data.phoneNumber,
                email: data.email,
                cityName: data.cityName,
                paymentMethod: data.paymentMethod,
                deliveryType: data.deliveryType,
                warehouseRef: data.warehouseRef,

                userId: userId,
                ttnNumber: data.ttnNumber || "PENDING",

                products: {
                    create: data.products.map(item => ({
                        product: {
                            connect: { id: item.productId }
                        },
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                products: true
            }
        });
    },
    deleteAdress: async(adressId) => {
        return await client.address.delete({
            where: { id: Number(adressId) }
        });
    },
    updateAdress: async (addressId: number, data: UpdateAddress): Promise<Address> => {
        const updateData: Prisma.AddressUpdateInput = {};
        if (data.city !== undefined) updateData.city = data.city;
        if (data.street !== undefined) updateData.street = data.street;
        if (data.numberOfHouse !== undefined) {
            updateData.numberOfHouse = Number(data.numberOfHouse);
        }
        if (data.numberOfFlat !== undefined) {
            updateData.numberOfFlat = Number(data.numberOfFlat);
        }
        if (data.entrance !== undefined) {
            updateData.entrance = Number(data.entrance);
        }

        return await client.address.update({
            where: { id: addressId },
            data: updateData
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
