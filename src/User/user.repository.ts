import { IUserRepositoryContract } from "./user.types";
import { client } from '../client/client'


export const UserRepository: IUserRepositoryContract = {
    async findUserByEmail(email) {
            try {
                return await client.user.findUnique({
                    where: {
                        email: email
                    },
                })
            } catch (error) {
                throw error
            }
        },
    
    // async findUserByIdWithoutPassword(id) {
    //     try {
    //         const foundedUser =  await client.user.findUnique({
    //             where: {
    //                 id: id
    //             },
    //             select: {
    //                 id: true,
    //                 firstName: true,
    //                 patronMik: true,
    //                 lastName: true,
    //                 email: true,
    //                 birthDate: true,
    //                 phoneNumber: true,
    //                 deliveries: true
    //             }
    //         })
    //         return foundedUser
    //     } catch (error) {
    //         throw error
    //     }
    // },
    
    createUser: async(dataWithHashedPassword) =>{
        try {
            const user = await client.user.create({
                data: dataWithHashedPassword
            })
            return user
        } catch (error) {
            throw error
        }
    }
}