import { PrismaClient } from "@prisma/client";
import { IUserRepositoryContract, UserWithoutPassword } from "./user.types";


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
    
    // createAddress: async (data, userId) => {
    //     const createdAddress =  client.address.create({
    //     data: {
    //         city: data.city,
    //         street: data.street,
    //         numberOfHouse: data.numberOfHouse,
    //         numberOfFlat: data.numberOfFlat,
    //         entrance: data.entrance,
    //         userId: userId
    //     },
    // })
    //     return createdAddress
    // },

    // deleteAddress: async(addressId) => {
    //     try{
    //         const deletedDelivery = await client.address.delete({
    //             where: {
    //                 id: addressId
    //             }
    //         })
    //         return deletedDelivery
    //     }catch(error){
    //         throw error
    //     }
    // },
    // updateAddress: async (addressId, data)=>{
    //     try{
    //         const updatedAdress = await client.address.update({
    //             where: {
    //                 id: addressId
    //             },data:data
    //         })
    //         return updatedAdress
    //     }catch(error){
    //         throw error
    //     }
    // },

    // getUserDeliveries: async (userId) => {
    //     try {
    //         const userDelivery = await client.address.findMany({
    //             where: {
    //                 userId: userId
    //             }
    //         })
    //         return userDelivery
    //     } catch (error){
    //         throw error
    //     }
    // },

};
