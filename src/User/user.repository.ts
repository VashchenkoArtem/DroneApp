import { PrismaClient } from "@prisma/client";
import { UserWithoutPassword } from "./user.types";


const client = new PrismaClient();


export const UserRepository = {
    
    createUser: async (data: any) => {
        try {
            const createdUser = await client.user.create({
                data: {
                    firstName: data.firstName,
                    patronMik: data.patronMik,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    birthDate: data.birthDate,
                    phoneNumber: data.phoneNumber,
                }
            });
            return createdUser;
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
                include: {
                    deliveries: true
                }
            });

            if (!user) return null;
            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword as UserWithoutPassword;
        } catch (error) {
            console.error("Error in findUserById repository:", error);
            throw error;
        }
    }
};
